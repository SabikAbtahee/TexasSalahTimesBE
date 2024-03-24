import { Module } from '@nestjs/common';
import { SalahTimesModule } from '../salah-times/salah-times.module';


@Module({
  imports: [SalahTimesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
