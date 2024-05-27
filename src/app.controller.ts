import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from '@app/email';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private emailService: EmailService,
  ) {}

  @Get('')
  getHello() {
    return 'Email sent';
  }
}
