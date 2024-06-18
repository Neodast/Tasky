import {
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from 'src/user/user.service';
import { UserPayloadDto } from './dtos/user-payload.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: LoggerService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async verifyUser(payload: UserPayloadDto) {
    const user = await this.userService.get({
      where: { email: payload.email },
    });

    const passwordIsValid = await bcrypt.compare(
      payload.password,
      user.password,
    );
    if (!passwordIsValid) {
      this.loggerService.error({
        message: 'Credentials are not valid',
        level: 'error',
        context: 'AuthService',
      });
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }
}
