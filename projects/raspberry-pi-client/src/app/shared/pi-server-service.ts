import { Observable } from 'rxjs';
import { GpioPin, GpioPinValue } from './gpio-pin';
import { AppConfigService } from '../core/app-config.service';

export abstract class PiServerService {
  get piServerUrl(): string {
    return this.appConfig.activeServer.value?.url || '';
  }

  constructor(protected readonly appConfig: AppConfigService) {}

  abstract getPins(): Observable<GpioPin[]>;
  abstract setPin(pin: number, value: GpioPinValue): Observable<void>;
  abstract setPin(pin: GpioPin): Observable<void>;
}
