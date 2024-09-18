import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable()
export class SerializeInputInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body)
      request.body = plainToInstance(this.dto, request.body, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });

    return next.handle();
  }
}
