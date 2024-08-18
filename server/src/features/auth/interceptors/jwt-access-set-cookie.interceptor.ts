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
export class JwtAccessSetCookieInterceptor implements NestInterceptor {
  constructor(private cookieHelper: CookieHelper) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse();
        const { accessToken, refreshToken } = data;

        this.cookieHelper.setCookie(res, 'accessToken', accessToken);

        return { accessToken: accessToken, refreshToken: refreshToken };
      }),
    );
  }
}
