import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { UserEntity } from "../entities/userEntity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private authService: AuthService){
        super();
    }

    serializeUser(user: UserEntity, done: Function) {
        // console.log('Serializer user');
        
       done(null, user) ;
    }

   async deserializeUser(payload: any, done: Function) {
     const user = await this.authService.finduser(payload.userid) 
    //  console.log(user);
      
        return user ? done(null, user) :done(null, null)
    }
}