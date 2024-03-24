import { NestFactory } from '@nestjs/core';
import { AppModule } from './root/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
