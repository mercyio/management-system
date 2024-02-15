import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Auth/entities/user.entity';
import { AuthModule } from './Auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GoogleStrategy } from './Auth/strategy/google.strategy';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    DatabaseModule,
    MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              transport: {
                service: 'gmail',
                auth: {
                  user: configService.getOrThrow("EMAIL_USER"),
                  pass: configService.getOrThrow("EMAIL_SECRET"),
                },
              },
            }),
            inject: [ConfigService],
      }),
   ],
})
export class AppModule {}
