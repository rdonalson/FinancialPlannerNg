import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransformationComponent } from './data-transformation.component';

describe('DataTransformationComponent', () => {
  let component: DataTransformationComponent;
  let fixture: ComponentFixture<DataTransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTransformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
