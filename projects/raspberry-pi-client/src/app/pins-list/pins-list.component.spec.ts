// Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// 3rd party.
import { of } from 'rxjs';

// Local.
import { PinsListModule } from './pins-list.module';
import { PinsListComponent } from './pins-list.component';
import { PiServerService } from '../shared/pi-server-service';

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
      imports: [PinsListModule],
      providers: [{ provide: PiServerService, useValue: MOCK_PI_SERVICE }]
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
