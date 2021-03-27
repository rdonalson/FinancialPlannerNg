import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialAmountComponent } from './initial-amount.component';

describe('InitialAmountComponent', () => {
  let component: InitialAmountComponent;
  let fixture: ComponentFixture<InitialAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
