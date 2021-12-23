import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
