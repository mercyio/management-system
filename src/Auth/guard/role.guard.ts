import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenRoleException } from "../exception/role.exception";
import { AuthService } from "../auth.service";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor (private reflector: Reflector, private authservice:AuthService){}

  async canActivate(context: ExecutionContext):Promise<boolean>{
       const roles = this.reflector.get<string[]>('role', context.getHandler());
       const request = context.switchToHttp().getRequest();
       if(request?.user){
        const headers : Headers = request.headers
        let user = this.authservice.user(headers);

        if(!roles.includes((await user).role)){
            throw new ForbiddenRoleException(roles.join(' or '));
        }
        return true;
       }
       return false;
    }

    
}