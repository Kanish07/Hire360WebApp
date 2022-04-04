import { HR } from "./hr";

export class Job{

    public jobId!:string;
    public hrid!:string
    public jobTitle!:string;
    public jobDescription!:string;
    public jobCity!:string;
    public noOfVacancy!:number;
    public package!:number;
    public createdAt!:string;
    public hr!:HR;

    constructor(){
    }
}