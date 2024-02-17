import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class BlockGuard implements CanActivate{
   constructor(private authService: AuthService) 
   {}
   
   async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest()


    const user = request.user
    //  console.log(user)

     if( user && user.blocked){
       throw new UnauthorizedException(`Your account has been blocked`)
     }
      return true;
   }  
   
}