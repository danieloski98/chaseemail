import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';
import { join } from 'path';

require('dotenv').config();


@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');
  constructor(
    private mailService: MailerService,
  ) {
  }

  static generateNumber(): string {
    const code = randomInt(100, 899);
    const code2 = randomInt(200, 999);
    return `${code}${code2}`;
  }

  async sendEmailVerificationOTP(email: string) {
    const otp = EmailService.generateNumber();


    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: [email],
        subject: 'Verify your email',
        template: join(process.cwd(), 'templates/event-template.hbs'),
        context: {
          email: 'danielemmanuel257@gmail.com',
          greetings: 'Hello World!',
          start: 'start',
          message: 'this is the message'
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
