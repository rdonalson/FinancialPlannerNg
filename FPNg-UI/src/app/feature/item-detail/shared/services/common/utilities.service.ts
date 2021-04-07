import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class UtilitiesService {

  constructor(private messageService: MessageService) {}

  onSaveComplete(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
    this.timeOut(3000);
  }

  onError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message}` });
    this.timeOut(3000);
  }

  timeOut(seconds: number): void {
    setTimeout(() => {
      this.messageService.clear();
    }, seconds);
  }

}
