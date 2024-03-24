import { PrayerText } from "./app.const";

export interface SalahWakt{
    [PrayerText.Fazr]: string;
    [PrayerText.Dhuhr]: string;
    [PrayerText.Asr]: string;
    [PrayerText.Maghrib]: string;
    [PrayerText.Isha]: string;
    [PrayerText.Jummah]: string;
  }
  