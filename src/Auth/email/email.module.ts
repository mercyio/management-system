import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { JwtModule } from "@nestjs/jwt";
import { EmailService } from "./email.service";

@Module({
  imports: [
    JwtModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get("EMAIL_HOST"),
          port: configService.get("EMAIL_PORT"),
          secure: configService.get("SMTP_SECURE"),
          auth: {
            user: configService.get("EMAIL_USER"),
            pass: configService.get("EMAIL_PASSWORD"),
          },
        },
        defaults: {
          from: configService.get("EMAIL_FROM"),
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
  controllers: [],
})
export class EmailModule {}
