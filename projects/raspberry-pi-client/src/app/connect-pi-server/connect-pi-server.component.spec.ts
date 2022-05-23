import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectPiServerComponent } from './connect-pi-server.component';

describe('ConnectPiServerComponent', () => {
  let component: ConnectPiServerComponent;
  let fixture: ComponentFixture<ConnectPiServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectPiServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectPiServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
