import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Auth/entities/userEntity';
import { ProfileEntity } from 'src/Auth/entities/profile.entity';
import { GoogleEntity } from 'src/Auth/entities/google.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.getOrThrow('DB_HOST'),
              port: configService.getOrThrow('DB_PORT'),
              username: configService.getOrThrow('DB_USER'),
              password: configService.getOrThrow('DB_PASSWORD'),
              database: configService.getOrThrow('DB_DATABASE'),
              entities: [UserEntity, ProfileEntity, GoogleEntity],
              synchronize: configService.getOrThrow('DB_SYNC'),
            }),
            inject: [ConfigService]
          
          }),
    ]
})
export class DatabaseModule {}
