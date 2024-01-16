import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "../entities/userEntity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }


    async validate (payload:{email}) : Promise<UserEntity>{
        try{
            const {email} = payload
            const user = await this.authService.findEmail(email)
    
            if(!user){
                throw new UnauthorizedException();
            }
            return user;
        } catch(error){
            console.error('Error validating token :', error )
             throw new UnauthorizedException('INVALID TOKEN')
        }
       
    }
}