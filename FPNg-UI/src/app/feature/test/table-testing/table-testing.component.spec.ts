import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTestingComponent } from './table-testing.component';

describe('TableTestingComponent', () => {
  let component: TableTestingComponent;
  let fixture: ComponentFixture<TableTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
