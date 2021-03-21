import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Plan } from "src/Plans/entities/plans.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid", {name:"user_id"})
    id: string;

    @Column({name:"first_name"})
    firstName: string;

    @ManyToMany(() => Plan)
    @JoinTable()
    subscriptions: Plan[]
}