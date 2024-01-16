import { BadRequestException, HttpException, Injectable, Req, Res, UnauthorizedException, } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { SignupDto } from "./dto/signup.dto";
import { UserEntity } from "./entities/userEntity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import {Request, Response}  from 'express';

@Injectable()
export class AuthService {

  constructor ( 
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService :JwtService){}


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
        throw new BadRequestException('admin role should be lower case')
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
      userid: user.userid
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
      throw new UnauthorizedException
   }
   return mail;
}


async findUsers(){
  const users = await this.userRepo.find()
  return users;
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
}
