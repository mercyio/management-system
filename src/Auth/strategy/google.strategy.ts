import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Console, log } from 'console';
import * as dotenv from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-oauth2';


dotenv.config()





@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({ 
      authorizationURL: 'http://localhost:7000/auth/google/authorize',
      tokenURL: 'http://localhost:7000/auth/google/token',
      clientID: '924289317907-ppmv26t7g2sj9hhok1orrbj02j2bdnav.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:7000/api/v1/users/auth/google/redirect',
      scope: ['email', 'profile']
    });
  }

  // authorizationParams(): { [key: string]: string } {
  //   return {
  //     access_type: 'offline',
  //     prompt: 'consent',
  //   };
  // }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
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