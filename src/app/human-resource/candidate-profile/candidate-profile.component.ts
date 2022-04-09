import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Candidate } from 'src/app/model/candidate';
import { HumanResource } from 'src/app/model/humanresource';
import { JobAddByHr } from 'src/app/model/jobaddbyhr';
import { Qualification } from 'src/app/model/qualification';
import { Skill } from 'src/app/model/skill';
import { CandidateService } from 'src/app/shared/candidate.service';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  public hrid!: string;
  public candidate!: Candidate;
  public candidateId!: string;
  public humanResource!: HumanResource;
  public isLoadingSkills: boolean = true;
  public isLoadingQualification: boolean = true;
  public isLoadingCandidate: boolean = true;
  public isLoadingHR: boolean = true;
  public jobAddByHr: JobAddByHr[] = [];
  public candidateQualification: Qualification[] = [];
  public candidateSkills: Skill[] = [];
  public items: MenuItem[] = [];
  public photoLink!: string;
  public candidatePhoto: any;
  public percentage!: number;

  constructor(private route: Router, private candidateService: CandidateService, private humanresourceService: HumanResourceService) { }

  ngOnInit(): void {

    this.hrid = localStorage.getItem('id') as string;

    this.candidateId = this.route.url.split('/').pop()!;

    this.getQualificationByCandidateId();

    this.getSkillsByCandidateId();

    this.getHumanResourceById();

    this.getJobAddedByHrId();

    this.items = [
      { label: 'My Job', icon: 'pi pi-briefcase', routerLink: "/humanresource/dashboard" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/humanresource/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/login" }
    ];

    // Get candidate using candidate id
    this.candidateService.getCandidateById(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingCandidate = false;
        this.candidate = data['data' as keyof object] as unknown as Candidate;
        this.candidatePhoto = this.candidate.candidatePhotoUrl;
        if (this.candidate.candidatePhotoUrl == null) {
          this.photoLink = "../../../assets/blank-profile.webp"
        } else {
          this.photoLink = this.candidate.candidatePhotoUrl
        }
      },
      error: (error) => {
        this.isLoadingCandidate = false;
        console.error(error);
      }
    })
  }

  // Get qualification using candidate id
  getQualificationByCandidateId() {
    this.candidateService.getQualificationByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingQualification = false;
        this.candidateQualification = data['data' as keyof Object] as unknown as Qualification[];
        this.percentage = this.candidateQualification[0].qualificationPercentage;
      },
      error: (error) => {
        this.isLoadingQualification = false;
        console.error(error);
      }
    });
  }

  // Get skills using candidate id
  getSkillsByCandidateId() {
    this.candidateService.getSkillsByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingSkills = false;
        this.candidateSkills = data['data' as keyof Object] as unknown as Skill[];
      },
      error: (error) => {
        this.isLoadingSkills = false;
        console.error(error);
      }
    });
  }

  // Download resume using download my file function
  downloadMyFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.candidate.candidateResume);
    link.setAttribute('download', `resume.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // Get human resoucre using human resource id
  getHumanResourceById() {
    this.humanresourceService.getHumanResourceById(this.hrid).subscribe({
      next: (data) => {
        this.isLoadingHR = false;
        this.humanResource = data['data' as keyof Object] as unknown as HumanResource;
      },
      error: (err) => {
        this.isLoadingHR = false;
        console.log(err);
      }
    })
  }

  // Get job added using human resource id
  getJobAddedByHrId() {
    this.humanresourceService.getJobAddedByHrId(this.hrid).subscribe({
      next: (data) => {
        this.isLoadingHR = false;
        this.jobAddByHr = data['data' as keyof Object] as unknown as JobAddByHr[];
      },
      error: (err) => {
        this.isLoadingHR = false;
        console.log(err);
      }
    })

  }
}
