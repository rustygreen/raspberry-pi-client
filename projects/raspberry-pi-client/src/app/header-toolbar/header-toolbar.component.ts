import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderToolbarComponent implements OnInit {
  items!: MenuItem[];
  display = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'GPIO Pins',
        icon: 'pi pi-fw pi-bolt',
        command: () => this.router.navigate(['/pins'])
      },
      {
        label: 'Recipes',
        icon: 'pi pi-fw pi-bookmark',
        command: () => this.router.navigate(['/recipes'])
      }
    ];
  }
}
