// Angular.
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// 3rd party.
import { map } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

// Local.
import { AppStateService } from './core/app-state.service';
import { PiServerStorage } from './shared/pi-server-storage';
import { PiServersListComponent } from './pi-servers-list/pi-servers-list.component';
import { ConnectPiServerComponent } from './connect-pi-server/connect-pi-server.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly servers: PiServerStorage,
    private readonly appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.setPiServers();
  }

  setPiServers(): void {
    this.servers.findAll().pipe(
      map(servers => {
        this.appState.piServers.next(servers);
      })
    );

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
