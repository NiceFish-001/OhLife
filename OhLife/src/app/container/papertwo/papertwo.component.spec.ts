import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PapertwoComponent } from './papertwo.component';

describe('PapertwoComponent', () => {
  let component: PapertwoComponent;
  let fixture: ComponentFixture<PapertwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PapertwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PapertwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
