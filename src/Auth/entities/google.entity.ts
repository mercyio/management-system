import { UserRole } from "src/Auth/enum/role.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { Url } from "url";

@Entity()
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

    

    // @Column({
    //    type: 'enum',
    //    enum: UserRole,
    //    default: UserRole.unknown
    // })
    // role: UserRole;


   @CreateDateColumn()
   created_At: Date

   @UpdateDateColumn()
   update_At : Date

  
}