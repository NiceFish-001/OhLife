import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldiaryaudioComponent } from './alldiaryaudio.component';

describe('AlldiaryaudioComponent', () => {
  let component: AlldiaryaudioComponent;
  let fixture: ComponentFixture<AlldiaryaudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldiaryaudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldiaryaudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
