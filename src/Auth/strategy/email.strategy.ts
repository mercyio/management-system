// import { MailerService } from "@nestjs-modules/mailer";
// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy, VerifyCallback } from "passport-google-oauth20";
// import { ForgotPasswordDto } from "../dto/forgotpassword.dto";



// @Injectable()
// export class EmailStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(
//     private mailerService: MailerService,
//     private jwtService: JwtService,
//     private configService: ConfigService
//   ) {
//       super({
//         clientID: process.env.EMAIL_CLIENT_ID,
//         clientSecret: process.env.EMAIL_CLIENT_SECRET,
//         callbackURL: process.env.EMAIL_CALLBACK_URL,
//         refreshToken: process.env.EMAIL_REFRESH_TOKEN,
//         scope: ['email', 'profile'],
//       });
//   }



    
// async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ):Promise<any> {
//     console.log(accessToken);
//     console.log(profile);
//     console.log(refreshToken);
    
    
    
//     const { name, emails, photos } = profile;

//     const user = {
//       email: emails[0].value,
//       firstname: name.firstname,
//       lastname: name.lastname,
//       picture: photos[0].value,
//       accessToken,
//       refreshToken,
//     };
//     done(null, user);
//   }

//   async sendVerificationMail(payload: ForgotPasswordDto, firstname: string) {
//     const { email } = payload;
// //     const token = this.jwtService.sign(payload, {
// //     secret: process.env.JWT_SECRET,
// //      expiresIn: process.env.JWT_EXPIRESIN,
// //    });
// //     const url = `${process.env.EMAIL_CALLBACK_URL}?token=${token}`;
//     await this.mailerService.sendMail({
//       to: email,
//       from: 'mercyanke@gmail.com',
//       subject: "reset your password",
//       template: "./confirmation.hbs",
//       html: '<h1>reset your email</h1>',
//       context: {
//         name: firstname,
//         url: 'callbackURL',
//       },
//     });
//   }


//   async sendGeneratedPassword(email, password, firstname) {
//     await this.mailerService.sendMail({
//       to: email,
//       subject: "Password reset",
//       template: "./recovery.hbs",
//       context: {
//         name: firstname,
//         password: password,
//       },
//     });
//   }
// }
