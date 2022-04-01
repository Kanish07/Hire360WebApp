import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HumanResource } from '../model/humanresource';
import { JobPosted } from '../model/jobposted';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class HumanResourceService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  hrLogin(humanresource: HumanResource): Observable<Token> {
    let hrLoginUrl = this.baseUrl + 'HrLogin/login';
    return this.httpClient.post<Token>(hrLoginUrl, humanresource);
  }

  hrRegistration(humanresource: HumanResource): Observable<HumanResource> {
    let hrRegisterUrl = this.baseUrl + 'AddNewHumanResource';
    return this.httpClient.post<HumanResource>(hrRegisterUrl, humanresource);
  }

  getJobAddedByHrId(hrid: string): Observable<JobPosted> {
    let jobAddedByHrIdUrl= this.baseUrl+'GetJobAddedByHrId'+`${hrid}`;
    return this.httpClient.get<JobPosted>(jobAddedByHrIdUrl);
  }
}
