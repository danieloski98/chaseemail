import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '@app/email';
import { EventCreatedDto } from '../../libs/email/dto/EventCreatedDto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('EVENT')
@Controller('event')
export class EventController {
  constructor(private emailService: EmailService) {}

  @ApiBody({ type: EventCreatedDto })
  @Post('event-created')
  eventCreated(@Body() body: EventCreatedDto) {
    return this.emailService.sendEventCreatedEmail(body);
  }
}
