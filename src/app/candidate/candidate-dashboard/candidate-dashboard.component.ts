import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { Candidate } from 'src/app/model/candidate';
import { JobAppliedByJobId } from 'src/app/model/jobappliedbyjobid';
import { Qualification } from 'src/app/model/qualification';
import { Skill } from 'src/app/model/skill';
import { SkillSet } from 'src/app/model/skillset';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit, DoCheck {

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
  isLoading: boolean = true;
  submitted: boolean = false;
  percentage!: number;
  incompleteProfile: number = 0;
  incompleteProfilePercentage!: number;
  skillExsist: number = 0;
  addQualificationForm!: FormGroup;
  graduationYear!: string[];
  degree!: string[];
  displayResponsiveQualification!: boolean;
  displayResponsiveDescription!: boolean;
  candidateResume!: string;
  candidatePhoto!: string;
  uploadedFiles: any[] = [];
  fileName!: string;
  isLoadingSkills: boolean = true;
  isLoadingProfile: boolean = true;
  isLoadingQualfication: boolean = true;
  jobAppliedByCandidate: JobAppliedByJobId[] = []
  candidateDescription!: string;

  //Chart
  gaugeType:string = "full";
  gaugeValue = 28.3;
  gaugeLabel = "Profile Completion";
  gaugeAppendText = "%";


  constructor(private candidateService: CandidateService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.level = ["Beginner", "Intermediate", "Pro"];
    this.graduationYear = ["Before 2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
    this.degree = ["B.E CSE", "B.E ECE", "B.E EEE", "M.E CSE", "MCA", "OTHER DEGREE"];
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

    this.getAppliedJobsByCandidateId();

    this.addSkillForm = this.formBuilder.group({
      candidateId: [""],
      skillSetId: ["", [Validators.required]],
      skillLevel: ["", [Validators.required]]
    });

    this.addQualificationForm = this.formBuilder.group({
      candidateId: [""],
      degreeName: ["", [Validators.required]],
      qualificationPercentage: ["", [Validators.required]],
      yearOfGraduation: ["", [Validators.required]]
    });
  }

  ngDoCheck(): void {
    this.incompleteProfilePercentage = (10 - this.incompleteProfile) * 10
  }

  showResponsiveDialog() {
    this.displayResponsive = true;
  }

  showResponsiveDialogQualification() {
    this.displayResponsiveQualification = true;
  }

  showResponsiveDialogDescription() {
    this.displayResponsiveDescription = true;
  }

  //TODO: Hanlde Error
  getAllSkillSets() {
    this.candidateService.getAllSkillSets().subscribe({
      next: (data) => {
        this.isLoading = false
        this.skillSets = data['data' as keyof Object] as unknown as SkillSet[];
      },
      error: (error) => {
        this.isLoading = false
        console.error(error);
      }
    });
  }

  getCandidateById() {
    //TODO: Handle Error
    this.candidateService.getCandidateById(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingProfile = false;
        this.candidateDetails = data['data' as keyof Object] as unknown as Candidate;
        this.candidateResume = this.candidateDetails.candidateResume;
        this.candidatePhoto = this.candidateDetails.candidatePhotoUrl;
        if (this.candidateDetails.candidatePhotoUrl == null) {
          this.photoLink = "../../../assets/blank-profile.webp"
        } else {
          this.photoLink = this.candidateDetails.candidatePhotoUrl
        }
        if (this.candidateDetails.candidateDescription == null) {
          this.incompleteProfile = this.incompleteProfile + 1;
        }
        if (this.candidateDetails.candidatePhotoUrl == null) {
          this.incompleteProfile = this.incompleteProfile + 1;
        }
        if (this.candidateDetails.candidateResume == null) {
          this.incompleteProfile = this.incompleteProfile + 1;
        }
      },
      error: (error) => {
        this.isLoadingProfile = false;
        console.error(error);
      }
    });
  }

  getAppliedJobsByCandidateId(){
    //TODO: Hanlde Error
    this.candidateService.getAppliedJobsByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.jobAppliedByCandidate = data['data' as keyof Object] as unknown as JobAppliedByJobId[]
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  getQualificationByCandidateId() {
    //TODO: Hanlde Error
    this.candidateService.getQualificationByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingQualfication = false;
        this.candidateQualification = data['data' as keyof Object] as unknown as Qualification[];
        this.percentage = this.candidateQualification[0]?.qualificationPercentage
        if (this.candidateQualification.length != 1) {
          this.incompleteProfile = this.incompleteProfile + 1;
        }
      },
      error: (error) => {
        this.isLoadingQualfication = false;
        console.error(error);
      }
    });
  }

  getSkillsByCandidateId() {
    //TODO: Hanlde Error
    this.candidateService.getSkillsByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingSkills = false;
        this.candidateSkills = data['data' as keyof Object] as unknown as Skill[];
        if (this.candidateSkills.length == 0) {
          this.incompleteProfile = this.incompleteProfile + 1;
        }
      },
      error: (error) => {
        this.isLoadingSkills = false;
        console.error(error);
      }
    });
  }

  //TODO: Hanlde Error
  onSkillDelete(skillId: string) {
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

  //TODO: Handle Error
  onAddNewSkill(skill: Skill) {
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

  //TODO: HANLDE ERROR
  onAddNewQualification(qualification: Qualification) {
    this.candidateService.AddNewQualification(qualification).subscribe({
      next: (qualificationData) => {
        this.getQualificationByCandidateId();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Qualification Added' });
        this.isLoading = false
        this.onReset()
        this.displayResponsiveQualification = false
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false
        this.onReset()
      }
    });
  }

  onAdd(skill: Skill) {
    this.isLoading = true
    skill.skillSetId = this.addSkillForm.controls['skillSetId'].value.skillSetId;
    skill.candidateId = this.candidateId;
    this.onAddNewSkill(skill);
  }

  onAddQualification(qualification: Qualification) {
    this.isLoading = true
    qualification.candidateId = this.candidateId
    this.onAddNewQualification(qualification);
  }

  onReset() {
    this.submitted = false;
    this.addSkillForm.reset();
    this.addQualificationForm.reset();
  }

  downloadMyFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.candidateDetails.candidateResume);
    link.setAttribute('download', `resume.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  uploadFile = (files: any) => {
    this.isLoading = true;
    let fileToUpload = <File>files[0];
    let fileName:string = this.candidateId //get name from form for example
    let fileExtension:string = fileToUpload.name.split('?')[0].split('.').pop() || '';
    const formData = new FormData();
    formData.append('file', fileToUpload, fileName + '.' + fileExtension);
    console.log(formData);
    this.candidateService.uploadFile(formData, this.candidateId).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Resume Uploaded', detail: '' })
        this.getCandidateById()
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Resume upload failed', detail: '' })
      }
    });
  }

  uploadProfilePicture = (files: any) => {
    this.isLoading = true;
    let fileToUpload = <File>files[0];
    let fileName:string = this.candidateId //get name from form for example
    let fileExtension:string = fileToUpload.name.split('?')[0].split('.').pop() || '';
    const formData = new FormData();
    formData.append('file', fileToUpload, fileName + '.' + fileExtension);
    console.log(formData);
    this.candidateService.uploadProfilePicture(formData, this.candidateId).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Profile picture uploaded', detail: '' })
        this.getCandidateById()
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Profile picture upload failed', detail: '' })
      }
    });
  }

  onAddDescription(){
    this.isLoading = true
    this.candidateService.updateCandidateDescriptionByCandidateId(this.candidateId, this.candidateDescription).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Description updated', detail: '' })
        this.candidateDescription = "";
        this.displayResponsiveDescription = false;
        this.getCandidateById()
      },
      error: (error) => {
        this.isLoading = false;
        this.candidateDescription = "";
        this.displayResponsiveDescription = false;
        this.messageService.add({ severity: 'error', summary: 'Description update failed', detail: '' })
      }
    })
  }

  get h() {
    return this.addSkillForm.controls;
  }

  get q() {
    return this.addQualificationForm.controls;
  }
}
