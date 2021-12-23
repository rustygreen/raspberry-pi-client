import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesListComponent } from './recipes-list.component';

@NgModule({
  declarations: [RecipesListComponent],
  imports: [CommonModule],
  exports: [RecipesListComponent]
})
export class RecipesListModule {}
