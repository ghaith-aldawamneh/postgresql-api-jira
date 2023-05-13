import { Issue } from "entities";
import { BaseEntity, Column,CreateDateColumn,Entity,JoinColumn,ManyToOne,OneToMany,OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
 export class ContactInfo{
@PrimaryGeneratedColumn()
  id: number;
@Column({nullable:true})
phone: string;

@OneToOne(()=>Issue, Issue => Issue.contactinfo)
JoinColumn()
employee: Employee;// it will be employeeId you can also add it beside the JoinColumn


 }

 @OneToMany(()=>Text,task =>task.employee) 
 task:task[]


 @ManyToOne(()=>employee,employee=>employee.task)
 employee:employee

