import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { TimingEndpoint } from '../../shared/app.const';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { SalahWakt } from '../../shared/app.interface';
import * as htmlparser2 from 'htmlparser2';
@Injectable()
export class SalahTimesService {
  constructor(private readonly httpService: HttpService) {}

  async getSalahTimes():Promise<SalahWakt> {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(TimingEndpoint).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );
    return this.parseAzaanTimeFromHtml(data);
  }

  private parseAzaanTimeFromHtml(data: string): SalahWakt {
    const html = data;

    let iqamas = [];
    let azaans = [];
    let isIqama = false;
    let isAzaan = false;
    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        if (name === 'div' && attributes.class === 'prayer_iqama_div') {
          isIqama = true;
        } else if (name === 'div' && attributes.class === 'prayer_azaan_div') {
          isAzaan = true;
        }
      },
      ontext(text) {
        if (isIqama) {
          const matches = text.match(/\b\d{1,2}:\d{2}\s*(?:AM|PM)\b/g);
          if (matches) {
            iqamas.push(...matches);
          }
          isIqama = false;
        } else if (isAzaan) {
          const matches = text.match(/\b\d{1,2}:\d{2}\s*(?:AM|PM)\b/g);
          if (matches) {
            azaans.push(...matches);
          }
          isAzaan = false;
        }
      },
    });

    parser.write(html);
    parser.end();

    return {
      Asr: azaans[0],
      Fajr: azaans[1],
      Dhuhr: azaans[2],
      Maghrib: azaans[3],
      Isha: azaans[4],
      Jummah: null,
    };
  }
}
