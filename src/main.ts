import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = parseInt(process.env.PORT, 10) || 8001;

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('AskMe REST Docs')
    .setDescription('REST docs for AskMe Agents Api')
    .setVersion('1.0')
    .addTag('currencies')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('currencies-api/docs', app, document);

  await app.listen(PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
