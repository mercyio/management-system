import { Body, Controller, Get, HttpCode, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import {Request, Response}  from 'express';
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "./guard/role.guard";
import { Roles } from "./guard/role";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { BlockGuard } from "./guard/block.guard";
import { ResetPasswordto } from "./dto/resetpassword.dto";
import { ForgotPasswordDto } from "./dto/forgotpassword.dto";


@Controller()
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
    
    @UseGuards(BlockGuard)
    @Roles('admin', 'vendors')
    @Post('block/:userid')
    async blockuser(@Param('userid') userid:string){
      return await this.authService.blockUser(userid)
    }
    
    @HttpCode(200)
    @UseGuards(BlockGuard)
    @Roles('admin', 'vendors')
    @Post('unblock/:userid')
    async unblockuser(@Param('userid') userid: string){
      return await this.authService.unblock(userid)
    }
    
    @UseGuards(AuthGuard(),BlockGuard)
    @Get('user/:userid')
    async user(@Param('userid') userid:string){
      return await this.authService.finduser(userid)
    }
    
    @Roles('user')
    @Post('forgot-password')
    async requestPasswordReset(@Body() payload:ForgotPasswordDto, @Req() req:Request, @Res() res:Response) {
      return await this.authService.forgotPassword( payload,req, res);
    }
    
    @Roles('user')
    @Post('reset-password')
    async resetPassword(@Param('userid') userid:string,  @Body() payload: ResetPasswordto, @Res() res:Response, @Req() req:Request) {
      return await this.authService.resetpassword(userid, payload,res, req);
    }

    @Get()
    @UseGuards(AuthGuard('google'))
     googleAuth(@Req() req){}

    @Get('auth/google/redirect')
    @UseGuards(AuthGuard('google'))
     googleAuthRedirect(@Req() req){
    return this.authService.googleLogin(req)
    } 
}

