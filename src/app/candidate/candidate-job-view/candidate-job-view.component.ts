import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/model/job';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-candidate-job-view',
  templateUrl: './candidate-job-view.component.html',
  styleUrls: ['./candidate-job-view.component.css']
})
export class CandidateJobViewComponent implements OnInit, OnDestroy {

  isLoading!: boolean;
  searchedKeyword!: string;
  lowSalRange: number = 0;
  highSalRange: number = 999999999;
  city: string = "";
  title: string = "";
  page: number = 1;
  count!: number;
  candidateId!: string;

  items: MenuItem[] = [];
  job: Job [] = [];
  roleTypeDuplicate: string[] = [];
  roleType: string[] = [];
  allJob: Job[] = [];
  subscriptions: Subscription[] = [];

  constructor(private candidateService: CandidateService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Search Job', icon: 'pi pi-search', routerLink: "/candidate/job-search" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/candidate/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/candidate/login" }
    ];

    this.candidateId = localStorage.getItem('id') as string;

    this.getFilteredJob();

    this.getAllJob();
  }

  getAllJob(){
    var subscription = this.candidateService.getAllJob().subscribe({
      next: (jobs) => {
        this.allJob = jobs['data' as keyof Object] as unknown as Job[];
        this.allJob.forEach((j) => {
          this.roleTypeDuplicate.push(j.jobTitle)
        })
        this.roleType = [...new Set(this.roleTypeDuplicate)]
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.subscriptions.push(subscription);
  }

  getFilteredJob(){
    this.isLoading = true;
    var subscription = this.candidateService.getFilteredJob(this.candidateId ,this.page ,this.lowSalRange, this.highSalRange, this.city, this.title).subscribe({
      next: (jobs) => {
        this.isLoading = false;
        this.job = jobs['data' as keyof Object] as unknown as Job[];
        this.count = jobs['count' as keyof Object] as unknown as number;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
    this.subscriptions.push(subscription);
  }

  openJobPage(jobId: string){
    this.router.navigate([`candidate/job-detail/${jobId}`]);
  }

  sortDataByFreshness(){
    if(this.job){
      let sortedArr = this.job.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
      this.job = sortedArr;
    }
  }

  sortDataByPackage(){
    if(this.job){
      let sortedArr = this.job.sort((a, b) => b.package - a.package)
      this.job = sortedArr
    }
  }

  AddCity(city: string){
    if(!this.city.includes(city)){
      this.city += city + ','
    } else {
      this.city = this.city.replace(city+',',"")
    }
  }

  AddSalary(lowSal: number, highSal: number){
    this.lowSalRange = lowSal
    this.highSalRange = highSal
  }

  AddRole(role: string){
    if(!this.title.includes(role)){
      this.title +=  role + ','
    } else {
      this.title = this.title.replace(role+',',"")
    }
  }

  Filter(){
    this.getFilteredJob()
  }

  paginate(event: any) {
    this.page = event.page + 1
    this.job = []
    this.getFilteredJob();
  }

  ngOnDestroy(): void {
    this.subscriptions.map((subscription) => {
      if (!subscription.closed) {
        subscription.unsubscribe();
      }
    })
  }
}
