// Angular.
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// 3rd party.
import { map } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

// Local.
import { AppConfigService } from './core/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly appState: AppConfigService
  ) {}

  ngOnInit(): void {
    this.validateAppConfiguration();
  }

  validateAppConfiguration(): void {
    if (!this.appState.hasServices) {
      // TODO: Add this in.
      // const ref = this.dialogService.open(ConnectPiServerComponent, {
      //   header: 'Connect to a Raspberry Pi Server',
      //   closable: false,
      //   contentStyle: {
      //     'max-height': '500px',
      //     'max-width': '600px',
      //     overflow: 'auto'
      //   }
      // });
    }
  }
}
