import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Message Service
 */
@Injectable()
export class MessageUtilService {

  /**
   * Base Constructor
   * @param {MessageService} messageService Message Service from Prime Library
   */
  constructor(private messageService: MessageService) {}

  /**
   * Displays a success message
   * @param {string} message The information to be displayed in the Message
   */
  onSaveComplete(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
    this.timeOut(3000);
  }

  /**
   * Displays an error message
   * @param {string} message The information to be displayed in the Message
   */
  onError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message}` });
    this.timeOut(3000);
  }

  /**
   * Message Timeout
   * @param {number} seconds The number of Seconds you want to show the Message
   */
  timeOut(seconds: number): void {
    setTimeout(() => {
      this.messageService.clear();
    }, seconds);
  }

}
