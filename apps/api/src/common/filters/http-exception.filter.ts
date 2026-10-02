import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

/** Returns a consistent JSON error shape and logs unexpected failures. */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = isHttp ? exception.getResponse() : 'Internal server error';

    if (!isHttp) this.logger.error(exception);

    res.status(status).json({
      statusCode: status,
      error: typeof body === 'string' ? { message: body } : body,
      timestamp: new Date().toISOString(),
    });
  }
}
