import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn("uuid", {name:"plan_id"})
    id: string;

    @Column({name:"plan_code"})
    planCode: string;

    @Column({name:"plan_name"})
    planName: string

    @Column({name:"monthly_cost"})
    monthlyCost: number

    @Column({name:"annual_cost"})
    annualCost: number
}