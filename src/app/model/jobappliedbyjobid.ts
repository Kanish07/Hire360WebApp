import { Candidate } from "./candidate";

export class JobAppliedByJobId {

    public jobAppliedId! : string;
    public jobId! : string;
    public candidateId! : string;
    public appliedOn! : string;
    public candidate! : Candidate;
    constructor() {}
}