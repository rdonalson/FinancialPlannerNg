import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCoreComponent } from './test-core.component';

describe('TestCoreComponent', () => {
  let component: TestCoreComponent;
  let fixture: ComponentFixture<TestCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
