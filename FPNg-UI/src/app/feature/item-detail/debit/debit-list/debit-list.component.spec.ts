import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitListComponent } from './debit-list.component';

describe('DebitListComponent', () => {
  let component: DebitListComponent;
  let fixture: ComponentFixture<DebitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
