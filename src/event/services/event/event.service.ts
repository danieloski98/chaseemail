import { EmailService } from '@app/email';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventThreeDaysDto } from 'src/event/DTO/EventThreeDaysDto';

@Injectable()
export class EventService {
  constructor(
    private eventEmitter: EventEmitter2,
    private emailService: EmailService,
  ) {}

  async handleEmailSendingForThreeDays(payload: EventThreeDaysDto) {
    this.eventEmitter.emit('Send-three-days', payload);
  }

  async handleEmailSendingforOneDay(payload: EventThreeDaysDto) {
    this.eventEmitter.emit('Send-one-day', payload);
  }

  @OnEvent('Send-three-days')
  handleThreedays(body: EventThreeDaysDto) {
    console.log('from emitter');
    try {
      console.log(body);
      body.mailList.forEach((item) => {
        this.emailService.sendThreeDaysReminder(
          body,
          item.email,
          item.firstName,
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  @OnEvent('Send-one-day')
  handleOnedays(body: EventThreeDaysDto) {
    try {
      console.log(body);
      body.mailList.forEach((item) => {
        this.emailService.sendOneDaysReminder(body, item.email, item.firstName);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
