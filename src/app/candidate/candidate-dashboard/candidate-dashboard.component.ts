import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { Candidate } from 'src/app/model/candidate';
import { Qualification } from 'src/app/model/qualification';
import { Skill } from 'src/app/model/skill';
import { SkillSet } from 'src/app/model/skillset';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit {

  items: MenuItem[] = [];
  candidateId!: string;
  candidateDetails!: Candidate;
  candidateQualification: Qualification[] = [];
  candidateSkills: Skill[] = [];
  photoLink!: string;
  displayResponsive!: boolean;
  addSkillForm!: FormGroup;
  level!: string[];
  selectedLevel!: string;
  skillSets: SkillSet[] = [];
  isLoading: boolean = false;
  submitted: boolean = false;
  percentage!: number;


  constructor(private candidateService: CandidateService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService) { 
    this.level = ["Beginner", "Intermediate", "Pro"];
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Search Job', icon: 'pi pi-search', routerLink: "/candidate/job-search" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/candidate/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/candidate/login" }
    ];

    this.candidateId = localStorage.getItem('id') as string;
    
    this.getCandidateById();
    
    this.getQualificationByCandidateId();
    
    this.getSkillsByCandidateId();
    
    this.getAllSkillSets();
    
    this.addSkillForm = this.formBuilder.group({
      candidateId: [""],
      skillSetId: ["", [Validators.required]],
      skillLevel: ["", [Validators.required]]
    });    
  }

  showResponsiveDialog() {
    this.displayResponsive = true;
  }

  //TODO: Hanlde Error
  getAllSkillSets(){
    this.candidateService.getAllSkillSets().subscribe({
      next: (data) => {
        this.skillSets = data['data' as keyof Object] as unknown as SkillSet[];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getCandidateById(){
    //TODO: Handle Error
    this.candidateService.getCandidateById(this.candidateId).subscribe({
      next: (data) => {
        this.candidateDetails = data['data' as keyof Object] as unknown as Candidate;
        this.photoLink = this.candidateDetails.candidatePhotoUrl
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getQualificationByCandidateId(){
    //TODO: Hanlde Error
    this.candidateService.getQualificationByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.candidateQualification = data['data' as keyof Object] as unknown as Qualification[];
        this.percentage = this.candidateQualification[0]?.qualificationPercentage
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getSkillsByCandidateId(){
    //TODO: Hanlde Error
    this.candidateService.getSkillsByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.candidateSkills = data['data' as keyof Object] as unknown as Skill[];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  //TODO: Hanlde Error
  onSkillDelete(skillId: string) {
    console.log(skillId);
    this.confirmationService.confirm({
      message: 'Do you want to delete this skill?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.candidateService.deleteSkillById(skillId).subscribe({
          next: () => {
            this.getSkillsByCandidateId()
          },
          error: (error) => {
            console.log(error);
          }
        });
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Skill deleted' });
      }
    });
  }

  //TODO: Hanlde Error
  onAdd(skill: Skill){
    this.isLoading = true
    skill.skillSetId = this.addSkillForm.controls['skillSetId'].value.skillSetId;
    skill.candidateId = this.candidateId;
    this.candidateService.AddNewSkill(skill).subscribe({
      next: (data) => {
        this.getSkillsByCandidateId();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Skill Added' });
        this.isLoading = false
        this.onReset()
        this.displayResponsive = false
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false
      }
    });
  }

  onReset(){
    this.submitted = false;
    this.addSkillForm.reset()
  }

  get h(){
    return this.addSkillForm.controls;
  }
}
