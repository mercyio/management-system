import { UserRole } from "src/Auth/enum/role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity{
   @PrimaryGeneratedColumn()
    userid : number;

    @Column()
    firstname : string;

    @Column()
    lastname : string;

    @Column()
    phonenumber : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @Column({
       type: 'enum',
       enum: UserRole,
       default: UserRole.unknown
    })
    role: UserRole;

    @Column({
      default: false
    })
    blocked: boolean

   @CreateDateColumn()
   created_At: Date

   @UpdateDateColumn()
   update_At : Date
}