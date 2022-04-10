import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HumanResource } from '../model/humanresource';
import { JobAppliedByJobId } from '../model/jobappliedbyjobid';
import { JobPosted } from '../model/jobposted';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class HumanResourceService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  //  Human Resource Login
  hrLogin(humanresource: HumanResource): Observable<Token> {
    let hrLoginUrl = this.baseUrl + 'HrLogin/login';
    return this.httpClient.post<Token>(hrLoginUrl, humanresource);
  }

  // Human Resource registration
  hrRegistration(humanresource: HumanResource): Observable<HumanResource> {
    let hrRegisterUrl = this.baseUrl + 'AddNewHumanResource';
    return this.httpClient.post<HumanResource>(hrRegisterUrl, humanresource);
  }

  // Get job added by using Human Resource id
  getJobAddedByHrId(hrid: string): Observable<JobPosted> {
    let jobAddedByHrIdUrl = this.baseUrl + 'GetJobAddedByHrId/' + `${hrid}`;
    return this.httpClient.get<JobPosted>(jobAddedByHrIdUrl, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  // Add new job 
  postAddnewjob(jobposted: JobPosted): Observable<JobPosted> {
    let jobPostedByHrUrl = this.baseUrl + 'AddNewJob';
    return this.httpClient.post<JobPosted>(jobPostedByHrUrl, jobposted, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  // Get job applied using job id
  getJobAppliedByJobId(jobId: string): Observable<JobAppliedByJobId> {
    let jobAppliedByJobIdUrl = this.baseUrl + 'GetJobAppliedByJobId/' + `${jobId}`;
    return this.httpClient.get<JobAppliedByJobId>(jobAppliedByJobIdUrl, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  // Get Human Resource using Human Resource id
  getHumanResourceById(hrid: string):Observable<HumanResource>{
    let humanResourceByIdUrl = this.baseUrl + 'GetHumanResourceById/' + `${hrid}`;
    return this.httpClient.get<HumanResource>(humanResourceByIdUrl, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }
}
