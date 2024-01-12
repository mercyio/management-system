import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/userEntity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

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
      providers: [AuthService],
      exports: [AuthService],
    })
export class AuthModule {}