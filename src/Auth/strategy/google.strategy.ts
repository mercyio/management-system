import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({ 
  
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:7000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ):Promise<any> {
    console.log(accessToken);
    console.log(profile);
    console.log(refreshToken);
    
    
    
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstname: name.firstname,
      lastname: name.lastname,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}