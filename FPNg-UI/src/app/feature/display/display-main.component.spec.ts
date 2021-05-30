import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMainComponent } from './display-main.component';

describe('DisplayMainComponent', () => {
  let component: DisplayMainComponent;
  let fixture: ComponentFixture<DisplayMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
