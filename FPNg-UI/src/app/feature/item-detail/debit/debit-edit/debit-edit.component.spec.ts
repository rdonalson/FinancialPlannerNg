import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitEditComponent } from './debit-edit.component';

describe('DebitEditComponent', () => {
  let component: DebitEditComponent;
  let fixture: ComponentFixture<DebitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
