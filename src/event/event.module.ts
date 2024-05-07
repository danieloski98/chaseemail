import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EmailModule } from '@app/email';

@Module({
  controllers: [EventController],
  imports: [EmailModule],
})
export class EventModule {}
