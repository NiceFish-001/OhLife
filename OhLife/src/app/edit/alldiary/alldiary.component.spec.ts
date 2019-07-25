import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldiaryComponent } from './alldiary.component';

describe('AlldiaryComponent', () => {
  let component: AlldiaryComponent;
  let fixture: ComponentFixture<AlldiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
