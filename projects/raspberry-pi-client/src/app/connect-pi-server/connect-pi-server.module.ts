import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';

import { ConnectPiServerComponent } from './connect-pi-server.component';

@NgModule({
  declarations: [ConnectPiServerComponent],
  imports: [CommonModule, InputTextModule]
})
export class ConnectPiServerModule {}
