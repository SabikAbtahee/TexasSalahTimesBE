import { Module } from '@nestjs/common';
import { SalahTimesController } from './salah-times/salah-times.controller';
import { SalahTimesService } from './salah-times/salah-times.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SalahTimesController],
  providers: [SalahTimesService],
})
export class SalahTimesModule {}
