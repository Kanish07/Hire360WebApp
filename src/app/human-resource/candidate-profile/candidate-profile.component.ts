import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Candidate } from 'src/app/model/candidate';
import { Qualification } from 'src/app/model/qualification';
import { Skill } from 'src/app/model/skill';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  public hrid!: string;
  public candidate!: Candidate;
  public candidateId!: string;
  isLoadingSkills: boolean = true;
  isLoadingQualification: boolean = true;
  isLoadingCandidate: boolean = true;
  items: MenuItem[] = [];
  photoLink!: string;
  candidatePhoto: any;
  candidateQualification: Qualification[] = [];
  candidateSkills: Skill[] = [];
  percentage!: number;



  constructor(private route: Router, private candidateService: CandidateService) { }

  ngOnInit(): void {

    this.hrid = localStorage.getItem('id') as string;

    this.candidateId = this.route.url.split('/').pop()!;

    this.getQualificationByCandidateId();

    this.getSkillsByCandidateId();

    this.items = [
      { label: 'My Job', icon: 'pi pi-briefcase', routerLink: "/humanresource/dashboard" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/humanresource/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/logout" }
    ];

    this.candidateService.getCandidateById(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingCandidate = false;
        this.candidate = data['data' as keyof object] as unknown as Candidate;
        console.log(this.candidate);
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

  getQualificationByCandidateId() {
    this.candidateService.getQualificationByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingQualification = false;
        this.candidateQualification = data['data' as keyof Object] as unknown as Qualification[];
        console.log(this.candidateQualification)
      },
      error: (error) => {
        this.isLoadingQualification = false;
        console.error(error);
      }
    });
  }

  getSkillsByCandidateId() {
    this.candidateService.getSkillsByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingSkills = false;
        this.candidateSkills = data['data' as keyof Object] as unknown as Skill[];
        console.log(this.candidateSkills[0].skillSet.skillSetName);

      },
      error: (error) => {
        this.isLoadingSkills = false;
        console.error(error);
      }
    });
  }


  downloadMyFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.candidate.candidateResume);
    link.setAttribute('download', `resume.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
