// Angular.
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

// 3rd party.
import { MessageService } from 'primeng/api';
import { filter, finalize, Subscription } from 'rxjs';

// Local.
import { GpioPin, GpioPinValue } from '../shared/gpio-pin';
import { AppConfigService } from '../core/app-config.service';
import { PiServerService } from '../shared/pi-server-service';
import { DEFAULT_PINS_SKELETON_COUNT } from '../app.constants';

interface ListItem extends GpioPin {
  loading?: boolean;
}

@Component({
  selector: 'app-pins-list',
  templateUrl: './pins-list.component.html',
  styleUrls: ['./pins-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class PinsListComponent implements OnInit {
  loading = true;
  pins: ListItem[];
  search?: string;

  readonly pinValues = GpioPinValue;
  readonly stateOptions = [
    { label: 'Off', value: 0 },
    { label: 'On', value: 1 }
  ];

  private readonly skeletonCount: number;
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly piService: PiServerService,
    private readonly messageService: MessageService,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.skeletonCount =
      appConfig.config.value.skeletonCount || DEFAULT_PINS_SKELETON_COUNT;

    this.pins = new Array(this.skeletonCount);
  }

  ngOnInit(): void {
    this.appConfig.activeServer
      .pipe(filter(Boolean))
      .subscribe(() => this.refresh());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  refresh(): void {
    this.loading = true;
    this.pins = new Array(this.skeletonCount);
    this.piService
      .getPins()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: pins => (this.pins = pins),
        error: error =>
          this.alert('Query failed', 'Failed to query pins. {error}', error)
      });
  }

  update(pin: ListItem): void {
    pin.loading = true;
    this.piService
      .setPin(pin)
      .pipe(
        finalize(() => {
          delete pin.loading;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        error: error =>
          this.alert(
            'Update failed',
            `Failed to update pin #${pin.pin}. {error}`,
            error
          )
      });
  }

  private alert(summary: string, detail: string, error: Error): void {
    const errorMessage = `${error}`;
    detail.replace('{error}', errorMessage || '');

    this.messageService.add({
      summary,
      detail,
      severity: 'error'
    });
  }
}
