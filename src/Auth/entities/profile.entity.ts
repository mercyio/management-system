import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./userEntity";
import { UserRole } from "../enum/role.enum";
@Entity('profile')
export class ProfileEntity{
    @PrimaryGeneratedColumn()
    Id: string
    
    @Column()
    userName: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    phonenumber: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date


    @Column({
        type:'enum', 
        enum: UserRole,
        default: UserRole.user
})
role:UserRole

@Column({
    default: false
  })
  blocked: boolean

  // @Column({ name: "is_active", default: false })
  // isActive: boolean;


// @OneToOne(() => UserEntity, (user) => user.profile )
// @JoinColumn({name: 'user_id'})
// user: UserEntity;

}