import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../model/candidate';
import { Token } from '../model/token';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  candidateLogin(candidate:Candidate):Observable<Token>{
    let candidateLoginUrl = this.baseUrl + 'CandidateLogin/login';
    return this.httpClient.post<Token>(candidateLoginUrl, candidate);
  }

  candidateRegistration(candidate:Candidate):Observable<Candidate>{
    let candidateRegisterUrl = this.baseUrl + 'AddNewCandidate';
    return this.httpClient.post<Candidate>(candidateRegisterUrl, candidate);
  }
}
