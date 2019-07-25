import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifemainComponent } from './lifemain.component';

describe('LifemainComponent', () => {
  let component: LifemainComponent;
  let fixture: ComponentFixture<LifemainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifemainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
