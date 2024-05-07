import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { EmailModule } from '@app/email';

@Module({
  controllers: [VerificationController],
  imports: [EmailModule],
})
export class VerificationModule {}
