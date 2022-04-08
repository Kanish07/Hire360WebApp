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
  httpHeader!: HttpHeaders;

  constructor(private httpClient: HttpClient) { 
    var token = localStorage.getItem('token');
    this.httpHeader = new HttpHeaders({
      "Authorization" : `Bearer ${token}`
    })
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
    return this.httpClient.get<Candidate>(candidateByIdUrl, { headers: this.httpHeader } );
  }

  getQualificationByCandidateId(candidateId: string): Observable<Qualification>{
    let qualificationByCandidateId = this.baseUrl + 'GetQualificationByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Qualification>(qualificationByCandidateId, { headers: this.httpHeader }).pipe(delay(1000));;
  }

  getSkillsByCandidateId(candidateId: string): Observable<Skill>{
    let qualificationByCandidateId = this.baseUrl + 'GetSkillsByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Skill>(qualificationByCandidateId, { headers: this.httpHeader });
  }

  deleteSkillById(skillId: string): Observable<Skill>{
    let deleteSkillById = this.baseUrl + 'DeleteSkillById/' + `${skillId}`;
    return this.httpClient.delete<Skill>(deleteSkillById, { headers: this.httpHeader });
  }

  getAllSkillSets(): Observable<SkillSet>{
    let getAllSkillSets = this.baseUrl + 'GetAllSkillSets';
    return this.httpClient.get<SkillSet>(getAllSkillSets, { headers: this.httpHeader }).pipe(delay(1000));;
  }

  AddNewSkill(skill: Skill): Observable<Skill>{
    let addNewSkill = this.baseUrl + 'AddNewSkill';
    return this.httpClient.post<Skill>(addNewSkill, skill, { headers: this.httpHeader });
  }

  AddNewQualification(qualification: Qualification): Observable<Qualification>{
    let addNewQualification = this.baseUrl + 'AddNewQualification';
    return this.httpClient.post<Qualification>(addNewQualification, qualification, { headers: this.httpHeader });
  }

  uploadFile(formData: FormData, candidateId: string){
    let uploadFile = this.baseUrl + 'uploadresume/' + `${candidateId}`;
    return this.httpClient.post(uploadFile ,formData, { headers: this.httpHeader });
  }

  uploadProfilePicture(formData: FormData, candidateId: string){
    let uploadPic = this.baseUrl + 'UploadProfilePicture/' + `${candidateId}`;
    return this.httpClient.post(uploadPic, formData, { headers: this.httpHeader });
  }

  getAllJob(): Observable<Job>{
    let getAllJob = this.baseUrl + 'GetAllJobs';
    return this.httpClient.get<Job>(getAllJob, { headers: this.httpHeader }).pipe(delay(1000));
  }

  GetJobByIdCheckIfAlreadyApplied(jobId: string, candidateId: string): Observable<Job>{
    let getSpecificJob = this.baseUrl + 'GetJobByIdCheckIfAlreadyApplied/' + `${jobId}` + '/' + `${candidateId}`;
    return this.httpClient.get<Job>(getSpecificJob, { headers: this.httpHeader }).pipe(delay(1000))
  }

  applyJob(jobId: string, candidateId: string){
    let job = {"jobId": jobId, "candidateId": candidateId}
    let jobApply = this.baseUrl + 'AddNewJobApplied';
    return this.httpClient.post(jobApply, job, { headers: this.httpHeader });
  }

  getFilteredJob(candidateId: string, page: number, lowsal: number, highsal: number, city: string, role: string): Observable<Job>{
    let filterJob = this.baseUrl + `GetAllJobsBasedOnFilter/${candidateId}/${page}` + `?salarylow=${lowsal}&salaryhigh=${highsal}&city=${city}&role=${role}`
    return this.httpClient.get<Job>(filterJob, { headers: this.httpHeader }).pipe(delay(2000));
  }

  getJobDetailByJobId(jobId: string): Observable<Job>{
    let getSpecificJob = this.baseUrl + 'GetJobById/' + `${jobId}`;
    return this.httpClient.get<Job>(getSpecificJob, { headers: this.httpHeader }).pipe(delay(2000))
  }

  getAppliedJobsByCandidateId(candidateId: string): Observable<Job>{
    let GetCandidateAppliedJobsById = this.baseUrl + 'GetJobAppliedByCandidateId/' + `${candidateId}`;
    return this.httpClient.get<Job>(GetCandidateAppliedJobsById, { headers: this.httpHeader });
  }

  updateCandidateDescriptionByCandidateId(candidateId: string, description: string) {
    let updateDescription = this.baseUrl + 'UpdateCandidateDescriptionById/' + `${candidateId}?description=` + `${description}`;
    return this.httpClient.get(updateDescription, { headers: this.httpHeader }).pipe(delay(2000));
  }
}
