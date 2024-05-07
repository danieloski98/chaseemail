import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EmailVerificationDto } from '../dto/VerificationDto';
import { EventCreatedDto } from '../dto/EventCreatedDto';
require('dotenv').config();

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');
  constructor(private mailService: MailerService) {}

  async sendEmailVerificationOTP(payload: EmailVerificationDto) {
    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: payload.email,
        subject: 'Verify your email',
        template: join(process.cwd(), 'templates/otp.hbs'),
        context: {
          email: payload.email,
          greetings: payload.greeting,
          code: payload.code,
          message: payload.message,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendEventCreatedEmail(payload: EventCreatedDto) {
    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: payload.email,
        subject: 'Verify your email',
        template: join(process.cwd(), 'templates/event-template.hbs'),
        context: {
          email: payload.email,
          greetings: payload.greeting,
          start: payload.start,
          message: payload.message,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendTicketPurchaseEmail(payload: EventCreatedDto) {
    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: payload.email,
        subject: 'Verify your email',
        template: join(process.cwd(), 'templates/event-template.hbs'),
        context: {
          email: payload.email,
          greetings: payload.greeting,
          start: payload.start,
          message: payload.message,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
