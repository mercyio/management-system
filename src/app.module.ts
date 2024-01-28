import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Auth/entities/userEntity';
import { AuthModule } from './Auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GoogleStrategy } from './Auth/strategy/google.strategy';
import { EmailModule } from './Auth/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    DatabaseModule,
    EmailModule
  ],
})
export class AppModule {}
