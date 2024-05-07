import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Chasescroll Email API')
    .setDescription('API for sending emails in chasescroll')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap().then();
