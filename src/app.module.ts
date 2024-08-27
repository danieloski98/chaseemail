/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { helpers } from 'handlebars';
import { join } from 'path';
import { EmailModule } from '@app/email';
import { VerificationModule } from './verification/verification.module';
import { EventModule } from './event/event.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

require('dotenv').config();

@Module({
  imports: [
    EmailModule,
    MailerModule.forRootAsync({
      imports: undefined,
      useFactory: () => ({
        transport: `smtps://${process.env.SMTP_USERNAME}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_DOMAIN}`,
        defaults: {
          from: '"Chasescroll Support" <support@chasescroll.com>',
        },
        template: {
          dir: join(process.cwd(), '/templates'),
          adapter: new HandlebarsAdapter(helpers, {
            inlineCssEnabled: true,
            /** See https://www.npmjs.com/package/inline-css#api */
            inlineCssOptions: {
              url: ' ',
              preserveMediaQueries: true,
            } as any,
          }),
          options: {
            strict: true,
          },
        },
      }),
    }),
    VerificationModule,
    EventModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
