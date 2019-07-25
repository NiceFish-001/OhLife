import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldiarypictureComponent } from './alldiarypicture.component';

describe('AlldiarypictureComponent', () => {
  let component: AlldiarypictureComponent;
  let fixture: ComponentFixture<AlldiarypictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldiarypictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldiarypictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
