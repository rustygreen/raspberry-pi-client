import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsPageComponent } from './pins-page.component';

describe('PinsPageComponent', () => {
  let component: PinsPageComponent;
  let fixture: ComponentFixture<PinsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
