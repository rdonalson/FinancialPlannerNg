import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  claims: any = null;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.claims = JSON.parse(localStorage.getItem('claims') || '{}');
  }

  showSuccess(): void {
    const message: string = 'Whoopee!!';
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: `${message}` });
  }

  showError(): void {
    this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'Oh shit!!' });
  }

}
