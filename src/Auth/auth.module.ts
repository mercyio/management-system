import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Auth/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleGuard } from './guard/role.guard';
import { BlockGuard } from './guard/block.guard';
import { GoogleStrategy } from './strategy/google.strategy';
import { ProfileEntity } from './entities/dashboard.entity';
import { GoogleEntity } from './entities/google.entity';
// import { SessionSerializer } from './serializer/serializer';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, ProfileEntity, GoogleEntity]),
           JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) =>
            ({
                secret: configService.getOrThrow<string>
                ('JWT_SECRET'), 
                signOptions:{
                    algorithm: configService.getOrThrow
                    ('JWT_ALGORITHM'),
                    expiresIn : configService.getOrThrow('JWT_EXPIRESIN')
                }
            }),
            inject: [ConfigService],
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, RoleGuard,BlockGuard, JwtStrategy, GoogleStrategy, ],
      exports: [AuthService, JwtStrategy, PassportModule],
    })
export class AuthModule {}