import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../model/candidate';
import { Token } from '../model/token';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Qualification } from '../model/qualification';
import { Skill } from '../model/skill';
import { SkillSet } from '../model/skillset';

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

  getCandidateById(candidateId: string): Observable<Candidate>{
    let candidateByIdUrl = this.baseUrl + 'GetCandidateById/' + `${candidateId}`;
    return this.httpClient.get<Candidate>(candidateByIdUrl);
  }

  getQualificationByCandidateId(candidateId: string): Observable<Qualification>{
    let qualificationByCandidateId = this.baseUrl + 'GetQualificationByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Qualification>(qualificationByCandidateId);
  }

  getSkillsByCandidateId(candidateId: string): Observable<Skill>{
    let qualificationByCandidateId = this.baseUrl + 'GetSkillsByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Skill>(qualificationByCandidateId);
  }

  deleteSkillById(skillId: string): Observable<Skill>{
    let deleteSkillById = this.baseUrl + 'DeleteSkillById/' + `${skillId}`;
    return this.httpClient.delete<Skill>(deleteSkillById);
  }

  getAllSkillSets(): Observable<SkillSet>{
    let getAllSkillSets = this.baseUrl + 'GetAllSkillSets';
    return this.httpClient.get<SkillSet>(getAllSkillSets);
  }

  AddNewSkill(skill: Skill): Observable<Skill>{
    let addNewSkill = this.baseUrl + 'AddNewSkill';
    return this.httpClient.post<Skill>(addNewSkill, skill);
  }
}
