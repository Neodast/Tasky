import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GetUsersDto } from './dtos/get-users.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { UserDto } from './dtos/user.dto';
import { UserRoles } from 'src/common/enums/user-role.enum';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserPayloadDto } from '../auth/dtos/user-payload.dto';

@Controller()
@UseGuards(JwtAccessAuthGuard, RolesGuard)
@Serialize(UserDto)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: Logger,
    private usersService: UsersService,
  ) {}

  @Get('profile')
  public async getProfile(@CurrentUser() user: UserPayloadDto) {
    const userProfile = await this.usersService.getOneByEmailOrFail(user.email);
    this.loggerService.log({
      message: `User ${user.username} successfully gotten profile`,
      level: 'info',
      context: 'UsersController.getProfile',
    });
    return userProfile;
  }

  @Roles(UserRoles.ADMIN)
  @Get('users')
  public async getAll(@Query() options: GetUsersDto) {
    return this.usersService.getAllByOptions(options);
  }
}
