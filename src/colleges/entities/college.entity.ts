import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'colleges'})
export class College{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'text' , nullable: true})
    description: string;

    @Column({type: 'boolean',default: true})
    active: boolean;
}