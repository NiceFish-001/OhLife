import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperthreeComponent } from './paperthree.component';

describe('PaperthreeComponent', () => {
  let component: PaperthreeComponent;
  let fixture: ComponentFixture<PaperthreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperthreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
