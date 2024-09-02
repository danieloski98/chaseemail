/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EmailVerificationDto } from '../dto/VerificationDto';
import { EventCreatedDto } from '../dto/EventCreatedDto';
import { TicketDto } from '../dto/TicketDto';
import Cloudinary from 'src/utils/cloudinary';
import { EventThreeDaysDto } from 'src/event/DTO/EventThreeDaysDto';
import { TicketSaleDto } from '../dto/TicketSaleDto';
const QRCode = require('qrcode');

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

  async sendPasswordResetOTP(payload: EmailVerificationDto) {
    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: payload.email,
        subject: 'Reset your password',
        template: join(process.cwd(), 'templates/passwordReset.hbs'),
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
        subject: 'Event Created',
        template: join(process.cwd(), 'templates/event-template.hbs'),
        context: {
          email: payload.email,
          greetings: payload.greeting,
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
        subject: 'Ticket Purchase Successful',
        template: join(process.cwd(), 'templates/event-template.hbs'),
        context: {
          email: payload.email,
          greetings: payload.greeting,
          message: payload.message,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendTicketEmail(payload: TicketDto) {
    const {
      ownerName,
      amount,
      email,
      endDate,
      eventLocation,
      eventName,
      startDate,
      ticketId,
      ticketType,
      id,
      // barCode,
    } = payload;
    // generate qrcode
    // console.log(QRCode);
    const barCode2 = await QRCode.toDataURL(ticketId);
    const request = await Cloudinary.uploader.upload(barCode2);
    //console.log(JSON.stringify(request));

    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: [payload.email],
        subject: 'Ticket Purchase Successful',
        template: join(
          process.cwd(),
          'templates/buy-register-event-template.hbs',
        ),
        context: {
          ownerName,
          amount,
          email,
          endDate,
          eventLocation,
          eventName,
          startDate,
          ticketType,
          barCode: request.secure_url,
          ticketId,
          id,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendThreeDaysReminder(
    payload: EventThreeDaysDto,
    email: string,
    firstName,
  ) {
    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: email,
        subject: 'Event Reminder!!!',
        template: join(process.cwd(), 'templates/event-3days.hbs'),
        context: {
          eventTitle: payload.eventTitle,
          time: payload.time,
          date: payload.date,
          creatorName: payload.creatorName,
          firstName,
          email,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendOneDaysReminder(
    payload: EventThreeDaysDto,
    email: string,
    firstName,
  ) {
    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: email,
        subject: 'Event Reminder for tomorrow!!!',
        template: join(process.cwd(), 'templates/event-1day.hbs'),
        context: {
          eventTitle: payload.eventTitle,
          time: payload.time,
          date: payload.date,
          creatorName: payload.creatorName,
          firstName,
          email,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendTicketSaleMail(payload: TicketSaleDto, email: string) {
    try {
      const emailFeedBack = await this.mailService.sendMail({
        to: [
          email,
          'opeyemikolawole890@gmail.com',
          'opeyemi.kolawole@chasescroll.com',
          'm.neboh@chasescroll.com',
        ],
        subject: 'Ticket Sale',
        template: join(process.cwd(), 'templates/ticket-sale-template.hbs'),
        context: {
          name: payload.name,
          eventName: payload.eventName,
          eventDescription: payload.eventDescription,
          eventDate: payload.eventDate,
          evenTime: payload.evenTime,
          ticketPrice: payload.ticketPrice <= 0 ? 'Free' : payload.ticketPrice,
          ticketName: payload.ticketName,
        },
      });
      this.logger.log(emailFeedBack);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
