// Angular.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Local.
import { PiServersListComponent } from './pi-servers-list.component';

@NgModule({
  declarations: [PiServersListComponent],
  imports: [CommonModule],
  exports: [PiServersListComponent]
})
export class PiServersListModule {}
