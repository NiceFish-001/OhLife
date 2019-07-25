import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperoneComponent } from './paperone.component';

describe('PaperoneComponent', () => {
  let component: PaperoneComponent;
  let fixture: ComponentFixture<PaperoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
