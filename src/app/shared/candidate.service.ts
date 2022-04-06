import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Candidate } from '../model/candidate';
import { Token } from '../model/token';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Qualification } from '../model/qualification';
import { Skill } from '../model/skill';
import { SkillSet } from '../model/skillset';
import { Job } from '../model/job';

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
    return this.httpClient.get<Qualification>(qualificationByCandidateId).pipe(delay(1000));;
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
    return this.httpClient.get<SkillSet>(getAllSkillSets).pipe(delay(1000));;
  }

  AddNewSkill(skill: Skill): Observable<Skill>{
    let addNewSkill = this.baseUrl + 'AddNewSkill';
    return this.httpClient.post<Skill>(addNewSkill, skill);
  }

  AddNewQualification(qualification: Qualification): Observable<Qualification>{
    let addNewQualification = this.baseUrl + 'AddNewQualification';
    return this.httpClient.post<Qualification>(addNewQualification, qualification);
  }

  uploadFile(formData: FormData, candidateId: string){
    let uploadFile = this.baseUrl + 'uploadresume/' + `${candidateId}`;
    return this.httpClient.post(uploadFile ,formData);
  }

  getAllJob(): Observable<Job>{
    let getAllJob = this.baseUrl + 'GetAllJobs';
    return this.httpClient.get<Job>(getAllJob).pipe(delay(1000));
  }

  GetJobByIdCheckIfAlreadyApplied(jobId: string, candidateId: string): Observable<Job>{
    let getSpecificJob = this.baseUrl + 'GetJobByIdCheckIfAlreadyApplied/' + `${jobId}` + '/' + `${candidateId}`;
    return this.httpClient.get<Job>(getSpecificJob).pipe(delay(1000))
  }

  applyJob(jobId: string, candidateId: string){
    let job = {"jobId": jobId, "candidateId": candidateId}
    let jobApply = this.baseUrl + 'AddNewJobApplied';
    return this.httpClient.post(jobApply, job);
  }

  getFilteredJob(lowsal: number, highsal: number, city: string, role: string): Observable<Job>{
    let filterJob = this.baseUrl + 'GetAllJobsBasedOnFilter' + `?salarylow=${lowsal}&salaryhigh=${highsal}&city=${city}&role=${role}`
    return this.httpClient.get<Job>(filterJob).pipe(delay(2000));
  }

  getJobDetailByJobId(jobId: string): Observable<Job>{
    let getSpecificJob = this.baseUrl + 'GetJobById/' + `${jobId}`;
    return this.httpClient.get<Job>(getSpecificJob)
  }
}

// https://localhost:5000/api/GetAllJobs?city=Coimbatore,Chennai&role=Software Engineer&salarylow=200000&salaryhigh=500000