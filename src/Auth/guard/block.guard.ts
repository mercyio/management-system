import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class BlockGuard implements CanActivate{
   constructor(private authService: AuthService, 
    private jwtService: JwtService, 
    private configService:ConfigService){}
   
   async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request); 
    if(!token){
        throw new UnauthorizedException("ACCESS TOKEN IS MISSING");
    }
    try{
        const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
          });
        request['user'] = payload;

        const userid = request.user?.userid
        const user = await this.authService.finduser(userid)
        if(user && user.blocked){
              return false;
        }
    }
   catch(error){
    throw new UnauthorizedException('EXPIRED OR INVALID TOKEN');
   }
   return true;

 }
 

//     const userid = request.user?.userid

//     const user =  await this.authService.finduser(userid)

//      if( user && user.blocked){

//       return true 
//      }
//       return false;
//    }  
  
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}