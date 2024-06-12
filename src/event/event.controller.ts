import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '@app/email';
import { EventCreatedDto } from '../../libs/email/dto/EventCreatedDto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TicketDto } from 'libs/email/dto/TicketDto';

@ApiTags('EVENT')
@Controller('event')
export class EventController {
  constructor(private emailService: EmailService) {}

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
}
