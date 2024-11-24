import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieHelper } from '../helpers/cookie.helper';

@Injectable()
export class JwtRefreshClearCookieInterceptor implements NestInterceptor {
  constructor(private cookieHelper: CookieHelper) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(() => {
        const res = context.switchToHttp().getResponse();

        this.cookieHelper.clearCookie(res, 'refreshToken');
      }),
    );
  }
}
