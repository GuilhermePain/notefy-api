import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT
  app.useGlobalPipes(new ValidationPipe);
  app.enableCors({
    origin: [process.env.DEV_URL_ORIGIN, process.env.PROD_URL_ORIGIN],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  await app.listen(port);
}
bootstrap();
