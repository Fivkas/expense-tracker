import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so frontend (localhost:3000) can access backend (localhost:4000)
  app.enableCors({
    origin: "http://localhost:3000",
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

