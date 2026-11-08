import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestNodeApplication, NodeAdapter } from '@nestjs/platform-node';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestNodeApplication>(
    AppModule,
    new NodeAdapter(),
  );

  app.use(compression());

  // set prefix global
  app.setGlobalPrefix('api');

  // listen
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
