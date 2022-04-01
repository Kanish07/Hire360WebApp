import { SkillSet } from "./skillset";

export class Skill{

    public skillId!:string;
    public candidateId!:string
    public skillSetId!:string;
    public skillLevel!:string;
    public skillSet!:SkillSet;

    constructor(){
    }
}