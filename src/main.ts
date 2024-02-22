import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GlobalExceptionFilter } from './configs/global.exceptrionFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GameModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8103,
      },
    },
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen();
}
bootstrap();
