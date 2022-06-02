// Angular/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// 3rd party.
import { BehaviorSubject } from 'rxjs';

// Local.
import { AppConfigService } from '../core/app-config.service';
import { HeaderToolbarModule } from './header-toolbar.module';
import { HeaderToolbarComponent } from './header-toolbar.component';

const MOCK_APP_CONFIG_SERVICE = {
  config: {
    value: new BehaviorSubject({
      servers: []
    })
  }
};

describe('HeaderToolbarComponent', () => {
  let component: HeaderToolbarComponent;
  let fixture: ComponentFixture<HeaderToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderToolbarModule],
      providers: [
        {
          provide: AppConfigService,
          useValue: MOCK_APP_CONFIG_SERVICE
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
