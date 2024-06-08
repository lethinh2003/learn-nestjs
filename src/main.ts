import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT || 4000;

  await app.listen(port, () => {
    console.log('Hệ thống đang chạy ở cổng ' + port);
  });
}
bootstrap();
