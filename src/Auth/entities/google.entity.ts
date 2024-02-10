import { UserRole } from "src/Auth/enum/role.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { Url } from "url";
import { IsOptional } from "class-validator";

@Entity('Google')
export class GoogleEntity{
   @PrimaryGeneratedColumn()
    userid : string;

    @Column()
    displayName : string;

   //  @Column()
   //  username : string;

    @Column()
    picture : string;

    @Column()
    email : string;

    @Column({default: null})
    password : string;

   //  @Column({
   //     type: 'enum',
   //     enum: UserRole,
   //     default: UserRole.unknown
   //  })
   //  role: UserRole;

    @Column({
      default: false
    })
    blocked: boolean

   @CreateDateColumn()
   created_At: Date

   @UpdateDateColumn()
   update_At : Date

  
}