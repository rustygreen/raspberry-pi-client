// Angular.
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 3rd party.
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Local.
import { CoreModule } from '../core/core.module';
import { PinsListComponent } from './pins-list.component';

@NgModule({
  declarations: [PinsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    ToastModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    SkeletonModule,
    DynamicDialogModule,
    InputTextModule,
    InputSwitchModule,
    SelectButtonModule,
    ProgressSpinnerModule
  ],
  exports: [PinsListComponent]
})
export class PinsListModule {}
