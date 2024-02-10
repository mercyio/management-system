import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'config/data-source';

@Module({
    imports: [
      
      ConfigModule.forRoot({isGlobal: true}),
      TypeOrmModule.forRoot(dataSourceOptions)


        // TypeOrmModule.forRootAsync({
        //     useFactory: (configService: ConfigService) => ({
        //       type: 'postgres',
        //       host: configService.getOrThrow('DB_HOST'),
        //       port: configService.getOrThrow('DB_PORT'),
        //       username: configService.getOrThrow('DB_USER'),
        //       password: configService.getOrThrow('DB_PASSWORD'),
        //       database: configService.getOrThrow('DB_DATABASE'),
        //       entities: [UserEntity, ProfileEntity, GoogleEntity],
        //       synchronize: configService.getOrThrow('DB_SYNC'),
        //     }),
        //     inject: [ConfigService]
          
        //   }),
    ],
})
export class DatabaseModule {}
