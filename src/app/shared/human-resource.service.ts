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
  httpHeader!: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    var token = localStorage.getItem('token');
    this.httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    })
   }

  hrLogin(humanresource: HumanResource): Observable<Token> {
    let hrLoginUrl = this.baseUrl + 'HrLogin/login';
    return this.httpClient.post<Token>(hrLoginUrl, humanresource);
  }

  hrRegistration(humanresource: HumanResource): Observable<HumanResource> {
    let hrRegisterUrl = this.baseUrl + 'AddNewHumanResource';
    return this.httpClient.post<HumanResource>(hrRegisterUrl, humanresource);
  }

  getJobAddedByHrId(hrid: string): Observable<JobPosted> {
    let jobAddedByHrIdUrl = this.baseUrl + 'GetJobAddedByHrId/' + `${hrid}`;
    return this.httpClient.get<JobPosted>(jobAddedByHrIdUrl, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  postAddnewjob(jobposted: JobPosted): Observable<JobPosted> {
    let jobPostedByHrUrl = this.baseUrl + 'AddNewJob';
    return this.httpClient.post<JobPosted>(jobPostedByHrUrl, jobposted, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  getJobAppliedByJobId(jobId: string): Observable<JobAppliedByJobId> {
    let jobAppliedByJobIdUrl = this.baseUrl + 'GetJobAppliedByJobId/' + `${jobId}`;
    return this.httpClient.get<JobAppliedByJobId>(jobAppliedByJobIdUrl, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).pipe(delay(1000));
  }

  getHumanResourceById(hrid: string):Observable<HumanResource>{
    let humanResourceByIdUrl = this.baseUrl + 'GetHumanResourceById/' + `${hrid}`;
    return this.httpClient.get<HumanResource>(humanResourceByIdUrl, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }
}
