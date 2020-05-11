import {
    ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';


@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        description: 'Bad request!',
        requestData: {
          query: request.query,
          body: request.body,
          params: request.params,
        },
      });
  }
}
