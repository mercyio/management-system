import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException, Param, Req, Res, UnauthorizedException, } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { SignupDto } from "./dto/signup.dto";
import { UserEntity } from "./entities/userEntity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import {Request, Response}  from 'express';
import { ResetPasswordto } from "./dto/resetpassword.dto";
import { ForgotPasswordDto } from "./dto/forgotpassword.dto";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';
import { error, log, profile } from "console";
import { MailerService } from "@nestjs-modules/mailer";
import { GoogleEntity } from "./entities/google.entity";
import { GoogleDetails } from "./userType/type";
import { GoogleDto } from "./dto/google.dto";
// import {default as config} from '../config';

@Injectable()
export class AuthService {

  constructor ( 
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,

    @InjectRepository(GoogleEntity) private GoogleRepo: Repository<GoogleEntity>,
    private jwtService :JwtService,
   
    private configService :ConfigService,
    private mailerService :MailerService){}


async signup(payload: SignupDto){
   payload.email= payload.email.toLowerCase();
    const {email, password, ...rest}=payload;
      const userEmail = await this. userRepo.findOne({where:{email:email}});
  if(userEmail){
   throw new HttpException('email already exsit', 400)
  };
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
     try{
        const user = await this.userRepo.create({email, password:hashedPassword, ...rest})
        await this.userRepo.save(user);
        delete user.password;
        return user;
     } catch (err){
        if(err.code === '22P02'){
        throw new BadRequestException('role should be in lower case')
        }
        return err
     }
}



async signin(payload:LoginDto, @Req()req:Request, @Res()res:Response){
   const {email, password} = payload;

   const user = await this.userRepo.createQueryBuilder("user")
   .addSelect("user.password")
   .where("user.email = :email", {email:payload.email}).getOne()
   if(!user){
      throw new HttpException('NO EMAIL FOUND', 400)
   }
   if(!await bcrypt.compare(password, user.password)){
      throw new HttpException('SORRY PASSWORD NOT FOUND', 400)
   }
   const token = await this.jwtService.signAsync({
      email: user.email,
      userid: user.userid,
      role: user.role
   });
   res.cookie('isAuthenticated', token,{
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000
   });
    return res.send({
      success:true,
      userToken:token
    })
}


async logout (@Req()req:Request, @Res()res:Response){
   const clearCookie = res.clearCookie('isAuthenticated');
   const response = res.send(`user sucessfully logout`)
   return{
      clearCookie,
      response
   }
}


async findEmail(email:string){
   const mail = await this.userRepo.findOneByOrFail({email})
   if(!mail){
      throw new UnauthorizedException('email not found')
   }
   return mail;
}



async user(headers:any) :Promise<any>{
   const authorizationHeader = headers.authorization;

   if(authorizationHeader){
      const token = authorizationHeader.replace('Bearer', '').trim();
      // console.log(token);
      const secretOrKey = process.env.JWT_SECRET;
      try{
         const decoded = this.jwtService.verify(token);
         let userid = decoded["userid"];
         let user = await this.userRepo.findOneBy({userid});
         return{
            userid,
            name:user.firstname, 
            email: user.email, 
            role:user.role
         };
      } 
      catch(error){
         throw new UnauthorizedException('invalid TOKEN');
      }
   }
   else{
         throw new UnauthorizedException('invalid or missing bearer token')
      }

}



async findUsers(){
   const users = await this.userRepo.find()
   return users;
 }




  async blockUser( userid:string){
   try{
   const user =await this.userRepo.findOne({where:{userid}})
   const googleUsers = await this.GoogleRepo.findOne({where:{userid}})
      if(!user && !googleUsers){
         throw new UnauthorizedException('incorrect credentials')
      }
      user.blocked = true
      await this.userRepo.save(user)

      googleUsers.blocked = true
      await this.GoogleRepo.save(googleUsers)

       return 'successfully blocked';
   }
   catch(error){
      throw new UnauthorizedException('unable to block this user')
   }
   
}



async unblock(userid:string){
   try{
   const user =await this.userRepo.findOne({where:{userid}})
      if(!user){
         throw new UnauthorizedException('invalid credentials')
      }
      user.blocked = false
      const unblock =this.userRepo.save(user)
      return unblock
   }
  catch(error){
   throw new UnauthorizedException('unable to unblock this user')
  }
}



async finduser (userid:string){
   const user = await this.userRepo.findOneBy({userid})
   if(!user){
     throw new UnauthorizedException('user not found')
   }
   return user;
}

async forgotPassword(payload:ForgotPasswordDto ,@Req() req:Request,@Res() res:Response){

   const {email} = payload
   if (!email) {
     throw new BadRequestException("Email is required");
   }
   const user = await this.findEmail(email);
   if (!user) {
     throw new NotFoundException("User not found");
   }
   
   // const OTP = Math.random().toString(36).slice(-8);
   const OTP = Math.floor(10000000 + Math.random() * 90000000).toString().slice(0, 8);
   console.log(OTP);
   
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 1); 
   const hashedPassword = await bcrypt.hash( OTP, 10);
   
   await this.userRepo.save({
     ...user,
     password: hashedPassword,
   }); 

   // console.log(user.password);
   // console.log(user);
   
   
 
   try{
      await this.mailerService.sendMail({
        from: 'mercydanke10@gmail.com',
        to:`${user.email}`,
        subject: "Management system",
        html: `<b>hey ${user.lastname} this is your reset Password OTP ${OTP}. Do not disclose</b>`,
        text: 'here is your new password'
  
      });
   return res.send({
      message: `An OTP has been sent to ${user.email}`
   })
    
    }
  catch(error){
    return error
  }

    
 }



 async resetpassword(payload: ResetPasswordto, @Res() res:Response, @Req() req:Request) {
    
   try{
      const users = req.user
      const id = users['userid']
     const user = await this.userRepo.findOne({where: {userid: id}})
     
     console.log(user);
     
      const pwMatch = await bcrypt.compare(
         payload.OTP,
         user.password
       );
       console.log(user.password);
         
       
       if (!pwMatch) {
         throw new HttpException(" OTP has already been used",HttpStatus.BAD_REQUEST);
       }
      
         const currentDateTime = new Date()
      console.log( 'time sent:', currentDateTime);

      const expirationTime = new Date()
      expirationTime.setMinutes(expirationTime.getMinutes() + 1); 
      console.log('expiration time: ', expirationTime)

      const timeOut = setTimeout(() => {
      const now = new Date();
      console.log('current time:', now);
       
      if (now.getTime() < expirationTime.getTime()) {
         clearInterval(timeOut);
         console.log('OTP has expired');
         
         // throw new HttpException('OTP has expired', HttpStatus.BAD_REQUEST);
       } else {
         console.log('OTP is still valid');
         user.password = payload.OTP
         return 'unable to validate OTP'
       }
       
     }, 1000);
 
       const {newPassword, confirmPassword} = payload
        if(newPassword !== confirmPassword){
         throw new HttpException('password must be the same',HttpStatus.BAD_REQUEST)
        }
        console.log(newPassword);
       user.password = newPassword
       const hashedPassword = await bcrypt.hash(newPassword, 10);
       user.password = hashedPassword
       const userdetail= await this.userRepo.save(user);
       
      return res.send({
       userdetail
      })
   }
   catch(error){
      
     return res.send(error)
   }  
 }

 googleLogin( req){
   if(!req.user){
   console.log(req.user);
      return 'NO user from google'
   }
   
   return{
      message: 'user info from google',
      user: req.user
   }
  }

  async validateGoogleUsers( detail: GoogleDetails){
   const googleUsers = await this.GoogleRepo.findOne({where:{email: detail.email}})
   // console.log(googleUsers);
   
   if(googleUsers) return googleUsers

   const userdetail = await this.GoogleRepo.create(detail)   
  const savedatail = await this.GoogleRepo.save(userdetail)
  console.log(userdetail);
  return savedatail
  
  }
}
  



// async forgotPassword( @Res() res:Response, @Req() req:Request, payload:ForgotPasswordDto){

//    const {email} = payload

//    const user = await this.userRepo.findOne({ where: { email } });
//    console.log(user);
   

//     if (!user) {
//       throw new NotFoundException('email not found');
//     }
//     const userid = user.userid
//    // console.log(userid);
   
//     const token = await this.jwtService.signAsync({
//       email: user.email,
//       userid: user.userid,
//       role: user.role
//     })
   
//     const expirationDate = new Date();
//     expirationDate.setMinutes(expirationDate.getMinutes() + 1); 
//     const link = `http://localhost:7000/api/v1/users/reset-password/${userid}/${token}`
//     console.log(link)
//    //   return link
//    res.send('A link has been sent to you')
    
//   }



//   async resetpassword ( payload:ResetPasswordto, @Req() req:Request, @Res() res:Response){
//     const {id,token} = req.params
//     console.log(req.params);
    
//     const user = await this.userRepo.findOne({where:{userid:id}})
// // console.log(user);

//     if(!user){
//      throw new NotFoundException('user not found')
//     }

//     const verify = this.jwtService.verify(token)
//     let verifyUserid = verify['userid']
//     console.log(verifyUserid);
    
//     if(id != verifyUserid){
//      throw new NotFoundException('incorrect id')
//     } 

//     const{newPassword, confirmPassword} = payload
//     if(newPassword !== confirmPassword){
//      throw new NotFoundException('password must be the same')
//     }
//     console.log(newPassword);
    
//     user.password = newPassword 

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword
//     const userdetail = await this.userRepo.save(user) 
  
//    res.send(userdetail)

//   }

