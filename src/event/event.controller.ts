import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '@app/email';
import { EventCreatedDto } from '../../libs/email/dto/EventCreatedDto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TicketDto } from 'libs/email/dto/TicketDto';
import { EventThreeDaysDto } from './DTO/EventThreeDaysDto';
import { EventService } from './services/event/event.service';
import { TicketSaleDto } from 'libs/email/dto/TicketSaleDto';

@ApiTags('EVENT')
@Controller('event')
export class EventController {
  constructor(
    private emailService: EmailService,
    private eventService: EventService,
  ) {}

  @ApiBody({ type: EventCreatedDto })
  @Post('event-created')
  eventCreated(@Body() body: EventCreatedDto) {
    return this.emailService.sendEventCreatedEmail(body);
  }

  @ApiBody({ type: EventCreatedDto })
  @Post('ticket-purchased')
  ticketPurchase(@Body() body: EventCreatedDto) {
    return this.emailService.sendTicketPurchaseEmail(body);
  }

  @ApiBody({ type: TicketDto })
  @Post('ticket-template')
  ticketTemplate(@Body() body: TicketDto) {
    return this.emailService.sendTicketEmail(body);
  }

  @ApiBody({ type: EventThreeDaysDto })
  @Post('three-days-reminder')
  threedaysReminder(@Body() body: EventThreeDaysDto) {
    return this.eventService.handleEmailSendingForThreeDays(body);
  }

  @ApiBody({ type: EventThreeDaysDto })
  @Post('one-day-reminder')
  onedaysReminder(@Body() body: EventThreeDaysDto) {
    return this.eventService.handleEmailSendingforOneDay(body);
  }

  @ApiBody({ type: TicketSaleDto })
  @Post('ticket-sale')
  ticketSale(@Body() body: TicketSaleDto) {
    return this.emailService.sendTicketSaleMail(body, body.email);
  }
}
