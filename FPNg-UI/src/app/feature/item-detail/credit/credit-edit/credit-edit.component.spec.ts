import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditEditComponent } from './credit-edit.component';

describe('CreditEditComponent', () => {
  let component: CreditEditComponent;
  let fixture: ComponentFixture<CreditEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
