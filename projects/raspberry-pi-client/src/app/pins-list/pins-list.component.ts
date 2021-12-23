import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { PiService } from '../core/pi.service';
import { GpioPin, GpioPinValue } from '../shared/gpio-pin';

const SKELETON_COUNT = 13;

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
  pins: ListItem[] = new Array(SKELETON_COUNT);
  search?: string;

  readonly pinValues = GpioPinValue;
  readonly stateOptions = [
    { label: 'Off', value: 0 },
    { label: 'On', value: 1 }
  ];

  constructor(
    private readonly piService: PiService,
    private readonly messageService: MessageService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.pins = new Array(SKELETON_COUNT);
    this.piService
      .getPins()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: pins => {
          this.pins = pins;
          this.changeDetector.markForCheck();
        },
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
