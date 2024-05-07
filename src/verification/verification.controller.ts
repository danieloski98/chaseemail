import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '@app/email';
import { EmailVerificationDto } from '../../libs/email/dto/VerificationDto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('VERIFICATION')
@Controller('verification')
export class VerificationController {
  constructor(private emailService: EmailService) {}

  @ApiBody({ type: EmailVerificationDto })
  @Post('send_verification_email')
  sendVerificationEmail(@Body() body: EmailVerificationDto) {
    return this.emailService.sendEmailVerificationOTP(body);
  }

  @ApiBody({ type: EmailVerificationDto })
  @Post('send_password_reset_email')
  sendPasswordResetl(@Body() body: EmailVerificationDto) {
    return this.emailService.sendEmailVerificationOTP(body);
  }
}
