import { Candidate } from "./candidate";
import { Job } from "./job";

export class JobAppliedByJobId {

    public jobAppliedId! : string;
    public jobId! : string;
    public candidateId! : string;
    public appliedOn! : string;
    public candidate! : Candidate;
    public job!: Job;
    public active!: string;
    
    constructor() {}
}