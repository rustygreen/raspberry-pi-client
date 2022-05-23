import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiServersListComponent } from './pi-servers-list.component';

describe('PiServersListComponent', () => {
  let component: PiServersListComponent;
  let fixture: ComponentFixture<PiServersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiServersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiServersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
