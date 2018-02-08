import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDpComponent } from './change-dp.component';

describe('ChangeDpComponent', () => {
  let component: ChangeDpComponent;
  let fixture: ComponentFixture<ChangeDpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
