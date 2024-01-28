import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async sendVerificationMail(email: string, name: string) {
    const payload = { email: email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_SECRET"),
      expiresIn: this.configService.get<string>("JWT_EXPIRESIN"),
    });
    const url = `${this.configService.get(
      "EMAIL_CONFIRMATION_URL"
    )}?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "reset your password",
      template: "./confirmation.hbs",
      context: {
        name: name,
        url: url,
      },
    });
  }

  async sendGeneratedPassword(email, password, firstname) {
    await this.mailerService.sendMail({
      to:email,
      subject: "Password reset",
      template: "./recovery.hbs",
      context: {
        name: firstname,
        password: password,
      },
    });
  }
}
