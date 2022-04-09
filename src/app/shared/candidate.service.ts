import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Candidate } from '../model/candidate';
import { Token } from '../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) {
  }

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
    return this.httpClient.get<Candidate>(candidateByIdUrl, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  getQualificationByCandidateId(candidateId: string): Observable<Qualification>{
    let qualificationByCandidateId = this.baseUrl + 'GetQualificationByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Qualification>(qualificationByCandidateId, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  getSkillsByCandidateId(candidateId: string): Observable<Skill>{
    let qualificationByCandidateId = this.baseUrl + 'GetSkillsByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Skill>(qualificationByCandidateId, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  deleteSkillById(skillId: string): Observable<Skill>{
    let deleteSkillById = this.baseUrl + 'DeleteSkillById/' + `${skillId}`;
    return this.httpClient.delete<Skill>(deleteSkillById, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  getAllSkillSets(): Observable<SkillSet>{
    let getAllSkillSets = this.baseUrl + 'GetAllSkillSets';
    return this.httpClient.get<SkillSet>(getAllSkillSets, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  AddNewSkill(skill: Skill): Observable<Skill>{
    let addNewSkill = this.baseUrl + 'AddNewSkill';
    return this.httpClient.post<Skill>(addNewSkill, skill, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  AddNewQualification(qualification: Qualification): Observable<Qualification>{
    let addNewQualification = this.baseUrl + 'AddNewQualification';
    return this.httpClient.post<Qualification>(addNewQualification, qualification, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  uploadFile(formData: FormData, candidateId: string){
    let uploadFile = this.baseUrl + 'uploadresume/' + `${candidateId}`;
    return this.httpClient.post(uploadFile ,formData, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  uploadProfilePicture(formData: FormData, candidateId: string){
    let uploadPic = this.baseUrl + 'UploadProfilePicture/' + `${candidateId}`;
    return this.httpClient.post(uploadPic, formData, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  getAllJob(): Observable<Job>{
    let getAllJob = this.baseUrl + 'GetAllJobs';
    return this.httpClient.get<Job>(getAllJob, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  GetJobByIdCheckIfAlreadyApplied(jobId: string, candidateId: string): Observable<Job>{
    let getSpecificJob = this.baseUrl + 'GetJobByIdCheckIfAlreadyApplied/' + `${jobId}` + '/' + `${candidateId}`;
    return this.httpClient.get<Job>(getSpecificJob, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  applyJob(jobId: string, candidateId: string){
    let job = {"jobId": jobId, "candidateId": candidateId}
    let jobApply = this.baseUrl + 'AddNewJobApplied';
    return this.httpClient.post(jobApply, job, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  getFilteredJob(candidateId: string, page: number, lowsal: number, highsal: number, city: string, role: string): Observable<Job>{
    let filterJob = this.baseUrl + `GetAllJobsBasedOnFilter/${candidateId}/${page}` + `?salarylow=${lowsal}&salaryhigh=${highsal}&city=${city}&role=${role}`
    return this.httpClient.get<Job>(filterJob, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).pipe(delay(1000));
  }

  getJobDetailByJobId(jobId: string): Observable<Job>{
    let getSpecificJob = this.baseUrl + 'GetJobById/' + `${jobId}`;
    return this.httpClient.get<Job>(getSpecificJob, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  getAppliedJobsByCandidateId(candidateId: string): Observable<Job>{
    let GetCandidateAppliedJobsById = this.baseUrl + 'GetJobAppliedByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Job>(GetCandidateAppliedJobsById, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }

  updateCandidateDescriptionByCandidateId(candidateId: string, description: string) {
    let updateDescription = this.baseUrl + 'UpdateCandidateDescriptionById/' + `${candidateId}?description=` + `${description}`;
    return this.httpClient.get(updateDescription, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
  }
}
