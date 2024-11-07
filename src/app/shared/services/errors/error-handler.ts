import { ErrorHandler, inject } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';
import { AppError } from '../../utils/error';
import { LoggingService } from '../logging/logging.service';

export class AppErrorHandler implements ErrorHandler {
  private notificationService: NotificationService =
    inject(NotificationService);
  private loggingService: LoggingService = inject(LoggingService);

  handleError(error: any): void {
    if (error instanceof AppError) {
      this.notificationService.showError(error.message);
    }

    this.loggingService.logError(error.message, error.stack);
  }
}
