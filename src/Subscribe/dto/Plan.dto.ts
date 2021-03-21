import { IsUUID } from "class-validator";

export class PlanDto {

    @IsUUID('all', {each: true})
    readonly plans: string[]
}