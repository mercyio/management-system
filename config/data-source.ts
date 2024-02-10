import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import {  DataSource, DataSourceOptions } from "typeorm";


config();

const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions = ({
              type: 'postgres',
              host: configService.getOrThrow('DB_HOST'),
              port: configService.getOrThrow('DB_PORT'),
              username: configService.getOrThrow('DB_USER'),
              password: configService.getOrThrow('DB_PASSWORD'),
              database: configService.getOrThrow('DB_DATABASE'),
              entities: ['dist/**/*.entity.js'],
              migrations: ['dist/database/migrations/*.js']
          
})

const dataSource = new DataSource(dataSourceOptions);
export default dataSource