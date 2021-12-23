import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pins-page',
  templateUrl: './pins-page.component.html',
  styleUrls: ['./pins-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
