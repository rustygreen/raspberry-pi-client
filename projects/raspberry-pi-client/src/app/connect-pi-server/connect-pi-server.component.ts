import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-connect-pi-server',
  templateUrl: './connect-pi-server.component.html',
  styleUrls: ['./connect-pi-server.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectPiServerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
