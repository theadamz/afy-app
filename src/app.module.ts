import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SystemModule } from './system/system.module.js';

@Module({
  imports: [SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
