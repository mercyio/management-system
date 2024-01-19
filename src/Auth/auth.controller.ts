import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import {Request, Response}  from 'express';
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "./guard/role.guard";
import { Roles } from "./guard/role";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { BlockGuard } from "./guard/block.guard";

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({description: "User Signup/Registeration"})
  @ApiBody({type: SignupDto})
    async signupUser (@Body() payload: SignupDto){
      const user = await this.authService.signup(payload);
      return  user;
    }
    
    @Post('login')
    @ApiOkResponse({description: "User Login"})
    @ApiUnauthorizedResponse({description: "Invalid credentials"})
    @ApiBody({type : LoginDto})
    async login (@Body() payload:LoginDto, @Req()req:Request, @Res()res:Response){
      const token = await this.authService.signin(payload, req, res);
    }

    @HttpCode(200) 
    @Post('logout')
    async logout (@Req()req:Request, @Res()res:Response){
      return await this.authService.logout(req, res)
    }

    @Get('users')
    @ApiOkResponse()
    @ApiBearerAuth()
    // @ApiBody({type : 'users'})
    // @ApiUnauthorizedResponse({description: "Invalid credentials"})
    @UseGuards(AuthGuard(), RoleGuard)
    @Roles('admin', 'vendor')
    async findUsers(){
      return await this.authService.findUsers()
    }

    @Get('profile')
    @UseGuards(AuthGuard())
    async(@Req() req:Request){
      return req.user
    }

    @Post('block/:userid')
    @Roles('admin', 'vendor')
    async blockuser(userid:number){
      return await this.authService.blockUser(userid)
    }
    
    @HttpCode(200)
    @Post('unblock/:userid')
    @Roles('admin', 'vendor')
    async unblockuser(userid: number){
      return await this.authService.unblock(userid)
    }

    @Get(':userid')
    async user(userid:number){
      return await this.authService.finduser(userid)
    }
}