import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFeatureComponent } from './test-feature.component';

describe('TestFeatureComponent', () => {
  let component: TestFeatureComponent;
  let fixture: ComponentFixture<TestFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
