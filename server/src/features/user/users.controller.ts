import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GetUsersDto } from './dtos/get-users.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { UserDto } from './dtos/user.dto';
import { UserRoles } from 'src/common/enums/user-role.enum';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: Logger,
    private readonly userService: UsersService,
  ) {}

  @Roles(UserRoles.ADMIN)
  @Get()
  getAll(@Query() options: GetUsersDto) {
    return this.userService.getAllByOptions(options);
  }
}
