import {
  Controller,
  Get,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from '@app/email';
import { FileInterceptor } from '@nestjs/platform-express';
import { s3Client } from './utils/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';

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

  @Put('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    console.log(file);
    s3Client.send(
      new PutObjectCommand({
        Bucket: '',
        Body: file.buffer as any,
        Key: '/new-upload',
      }),
    );
  }
}
