import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PiServerService } from '../core/http-pi-server.service';
import { PinsPageModule } from '../pins-page/pins-page.module';

import { PinsListComponent } from './pins-list.component';

const MOCK_PI_SERVICE = {
  getPins: () => {
    return of([]);
  }
};

describe('PinsListComponent', () => {
  let component: PinsListComponent;
  let fixture: ComponentFixture<PinsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinsPageModule],
      providers: [
        {
          provide: PiServerService,
          useValue: MOCK_PI_SERVICE
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
