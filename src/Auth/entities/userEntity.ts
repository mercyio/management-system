import { UserRole } from "src/Auth/enum/role.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProfileEntity } from "./dashboard.entity";

@Entity('User')
export class UserEntity{
   @PrimaryGeneratedColumn()
    userid : string;

   //  @Column()
   //  firstname : string;

   //  @Column()
   //  lastname : string;

   //  @Column()
   //  phonenumber : string;

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

   //  @Column({ name: "is_active", default: false })
   //  isActive: boolean;

   @CreateDateColumn()
   created_At: Date

   @UpdateDateColumn()
   update_At : Date

   @OneToOne(() => ProfileEntity, (profile) => profile.user )
   profile: ProfileEntity;
}