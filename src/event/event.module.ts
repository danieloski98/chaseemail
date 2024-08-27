import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EmailModule } from '@app/email';
import { EventService } from './services/event/event.service';

@Module({
  controllers: [EventController],
  imports: [EmailModule],
  providers: [EventService],
})
export class EventModule {}
