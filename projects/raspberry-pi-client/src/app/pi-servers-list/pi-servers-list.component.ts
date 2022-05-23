import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pi-servers-list',
  templateUrl: './pi-servers-list.component.html',
  styleUrls: ['./pi-servers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PiServersListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
