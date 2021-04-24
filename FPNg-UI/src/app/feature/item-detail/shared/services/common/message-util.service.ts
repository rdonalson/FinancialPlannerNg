import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

/**
 * Message Service
 */
@Injectable()
export class MessageUtilService {
  private defaultMilliseconds = 2000;

  /**
   * Base Constructor
   * @param {Router} router For navigation feature
   * @param {MessageService} messageService Message Service from Prime Library
   */
  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  //#region Message Displays
  /**
   * Displays a success message with timeout feature
   * @param {string} message The information to be displayed in the Message
   */
  onComplete(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
    this.timeOut(this.defaultMilliseconds);
  }

  /**
   * Success message display function with a timeout and navigation features
   * @param {string} message The information to be displayed in the Message
   * @param {number} seconds Number of milliseconds to display message
   * @param {string} path Path to navigate to
   * @param {ActivatedRoute} route Relative location to begin navigation from
   */
  onCompleteNav(message: string, path: string, route: ActivatedRoute): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
    this.timeOutNav(this.defaultMilliseconds, path, route);
  }

  /**
   * Displays an error message
   * @param {string} message The information to be displayed in the Message
   */
  onError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message}` });
    this.timeOut(this.defaultMilliseconds);
  }
  //#endregion Message Displays

  //#region Utilities
  /**
   * Message Timeout that clears the message service queue
   * @param {number} milliseconds Number of milliseconds to display message
   */
  private timeOut(milliseconds: number): void {
    setTimeout(() => {
      this.messageService.clear();
    }, milliseconds);
  }

  /**
   * Timeout function with Activated route and path to navigate to
   * then clears the message service queue
   * @param {number} milliseconds Number of milliseconds to display message
   * @param {string} path Path to navigate to
   * @param {ActivatedRoute} route Relative location to begin navigation from
   */
  private timeOutNav(milliseconds: number, path: string, route: ActivatedRoute): void {
    setTimeout(() => {
      this.messageService.clear();
      this.router.navigate([path], { relativeTo: route });
    }, milliseconds);
  }
  //#endregion Utilities
}
