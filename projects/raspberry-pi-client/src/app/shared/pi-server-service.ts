// 3rd party.
import { map, Observable, tap } from 'rxjs';

// Local.
import { MissingServerError } from './errors';
import { KeyValuePair } from './key-value-pair';
import { GpioPin, GpioPinValue } from './gpio-pin';
import { AppConfigService } from '../core/app-config.service';

export abstract class PiServerService {
  get piServerUrl(): string {
    return this.appConfig.activeServer.value?.url || '';
  }

  constructor(protected readonly appConfig: AppConfigService) {}

  getPins(): Observable<GpioPin[]> {
    this.ensureServerConfigured();
    return this.getPinValues().pipe(
      map(pins => {
        const server = this.appConfig.activeServer.value;
        if (server?.hideUnlabeled) {
          pins = pins.filter(p => {
            const pinId = String(p.pin);
            const label = server.pinLabels?.[pinId];
            return Boolean(label);
          });
        }

        return pins;
      }),
      tap(pins => this.ensureTitle(pins))
    );
  }

  setPin(pin: number, value: GpioPinValue): Observable<void>;
  setPin(pin: GpioPin): Observable<void>;
  setPin(pin: GpioPin | number, value?: GpioPinValue): Observable<void> {
    this.ensureServerConfigured();

    const isPinNumber = Number.isInteger(pin);
    const pinNumber: number = isPinNumber
      ? (pin as number)
      : (pin as GpioPin).pin;

    value = isPinNumber ? (value as GpioPinValue) : (pin as GpioPin).value;

    return this.setPinValue(pinNumber, value);
  }

  protected abstract getPinValues(): Observable<GpioPin[]>;
  protected abstract setPinValue(
    pin: number,
    value: GpioPinValue
  ): Observable<void>;

  protected ensureServerConfigured(): void {
    if (!this.appConfig.hasActiveServer) {
      throw new MissingServerError();
    }
  }

  protected ensureTitle(pins: GpioPin[]): void {
    const pinLabels: KeyValuePair =
      this.appConfig.activeServer.value?.pinLabels || {};

    pins.forEach(p => {
      const title = pinLabels[String(p.pin)];
      p.title = title || p.title || `Pin ${p.pin}`;
    });
  }
}
