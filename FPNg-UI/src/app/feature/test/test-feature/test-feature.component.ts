/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumUtilService } from '../common/services/enum.service';
import { City } from '../common/models/city';
import { Order } from '../common/models/order';

@Component({
  templateUrl: './test-feature.component.html',
  styleUrls: ['./test-feature.component.scss']
})
export class TestFeatureComponent implements OnInit {
  title!: string;
  months: any;
  isValidated = false;
  fruits!: string[];
  cities!: City[];
  orders!: Order[];
  myForm!: FormGroup;
  selectedCity!: City;
  cityValue: any;
  certDate: Date = new Date('2020-05-05');
  checked: boolean = true;

  get fruit(): any {
    return this.myForm.get('fruit');
  }
  get city(): any {
    return this.myForm.get('city');
  }
  get order(): any {
    return this.myForm.get('order');
  }
  get month(): any {
    return this.myForm.get('month');
  }

  constructor(
    public fb: FormBuilder,
    private enumService: EnumUtilService
  ) {
    this.fruits = ['Apple', 'Mengo', 'Banana', 'Strawberry'];
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.orders = [
      { id: 1, name: 'order 1' },
      { id: 2, name: 'order 2' },
      { id: 3, name: 'order 3' },
      { id: 4, name: 'order 4' }
    ];
    this.months = this.enumService.months;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fruit: ['', [Validators.required]],
      city: ['', [Validators.required]],
      order: ['', [Validators.required]],
      month: ['', [Validators.required]],
      certified: [],
      certDate: ['', [Validators.required]]
    });

    this.myForm.patchValue({
      certDate: this.certDate
    });
  }

  changeFruit(e: any): void {
    this.fruit.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeCity(e: any): void {
    this.city.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeOrder(e: any): void {
    this.order.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeMonth(e: any): void {
    this.month.setValue(e.target.value, {
      onlySelf: true
    });
  }

  submit(): any {
    this.isValidated = true;
    if (!this.myForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.myForm.value));
    }
  }

  upper(): void {
    this.title = this.title.toUpperCase();
  }
}
