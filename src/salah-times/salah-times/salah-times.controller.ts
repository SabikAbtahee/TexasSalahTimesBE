import { Controller, Get } from '@nestjs/common';
import { SalahTimesService } from './salah-times.service';
import { SalahWakt } from '../../shared/app.interface';

@Controller('salah-times')
export class SalahTimesController {

    constructor(private salahTimesService:SalahTimesService){}
    @Get()
    async getTimings(): Promise<SalahWakt>{
        return await this.salahTimesService.getSalahTimes();
    }
}
