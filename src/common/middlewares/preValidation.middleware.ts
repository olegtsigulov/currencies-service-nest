import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';


@Injectable()
export class PreValidationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(PreValidationMiddleware.name);

    use(req: Request, res: Response, next: Function) {
      // this.logger.log(`Request info:  Method - ${req.method}, path - ${req.path}, date - ${new Date()} `);
      this.logger.log(`Enter middleware at:  ${new Date()} `);
      next();
    }
}
