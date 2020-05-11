import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = parseInt(process.env.PORT, 10) || 8001;

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationExceptionFilter());

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
