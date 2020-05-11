import {
  CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class TimeLoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(TimeLoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>)
        : Observable<any> | Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();

      const now = Date.now();
      return next
        .handle()
        .pipe(
          tap(() => this.logger.log(`${request.method}, path ${request.path}, time: ${Date.now() - now}ms`)),
        );
    }
}
