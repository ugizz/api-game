import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
  await app.listen();
}
bootstrap();
