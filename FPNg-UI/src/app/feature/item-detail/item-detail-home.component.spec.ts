import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailHomeComponent } from './item-detail-home.component';

describe('ItemDetailHomeComponent', () => {
  let component: ItemDetailHomeComponent;
  let fixture: ComponentFixture<ItemDetailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
