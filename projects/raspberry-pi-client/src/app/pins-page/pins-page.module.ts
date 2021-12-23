import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsPageComponent } from './pins-page.component';
import { PinsListModule } from '../pins-list/pins-list.module';
import { PinsPageRoutingModule } from './pins-page-routing.module';

@NgModule({
  declarations: [PinsPageComponent],
  imports: [CommonModule, PinsPageRoutingModule, PinsListModule]
})
export class PinsPageModule {}
