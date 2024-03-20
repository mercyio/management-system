import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({ 
  
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:7000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  // async validate(
  //   profile: Profile,
  //   accessToken: string,
  //   refreshToken: string,
  //   done: VerifyCallback,
  // ):Promise<any> {
    
    
  //     const user ={
  //       email: profile.emails[0].value,
  //       displayName: profile.displayName,
  //       // picture: profile.photos[0].value,
  //     };
  //    console.log(user);
     
  //     done(null, user);
  //   }

  async validate(
    profile: Profile,
    done: VerifyCallback,
  ):Promise<any> {
    
    const { name, emails, photos } = profile;
    
      const user = await this.authService.validateGoogleUsers({
        email: emails[0].value,
        displayName: profile.displayName,
        // username: profile.username,
        // firstname: profile.firstname,
        // lastname: profile.displayName,
        picture: profile.photos[0].value,
        // accessToken,
        // refreshToken,
      });
    //  console.log(user);
     
      done(null, user);
    }
    }
    