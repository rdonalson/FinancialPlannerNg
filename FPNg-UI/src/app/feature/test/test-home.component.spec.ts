import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHomeComponent } from './test-home.component';

describe('TestHomeComponent', () => {
  let component: TestHomeComponent;
  let fixture: ComponentFixture<TestHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
