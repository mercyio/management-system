import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Auth/entities/userEntity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleGuard } from './guard/role.guard';
import { BlockGuard } from './guard/block.guard';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
           JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) =>
            ({
                secret: configService.getOrThrow<string>
                ('JWT_SECRET'),
                signOptions:{
                    algorithm: configService.getOrThrow
                    ('JWT_ALGORITHM')
                }
            }),
            inject: [ConfigService],
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),

      ],
      controllers: [AuthController],
      providers: [AuthService, RoleGuard,BlockGuard, JwtStrategy, GoogleStrategy],
      exports: [AuthService, JwtStrategy, PassportModule],
    })
export class AuthModule {}