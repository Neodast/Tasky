import { UserRoles } from './../../common/enums/user-roles.enum';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GetUsersDto } from './dtos/get-users.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserDto } from './dtos/user.dto';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserPayloadDto } from '../auth/dtos/user-payload.dto';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { SerializeOutput } from 'src/common/decorators/serialize-output.decorator';

@Controller('users')
@SerializeOutput(UserDto)
@ApiTags('Users')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAccessAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: Logger,
    private usersService: UsersService,
  ) {}

  @Get('profile')
  @ApiResponse({
    type: UserDto,
    status: HttpStatus.OK,
  })
  public async getProfile(@CurrentUser() user: UserPayloadDto) {
    const userProfile = await this.usersService.getOneByEmailOrFail(user.email);
    this.loggerService.log({
      message: `User ${user.username} successfully gotten profile`,
      level: 'info',
      context: 'UsersController.getProfile',
    });
    return userProfile;
  }

  @Get('')
  @ApiQuery({ type: PickType(GetUsersDto, []) })
  @ApiResponse({ type: [UserDto], status: HttpStatus.OK })
  @Roles(UserRoles.Admin)
  public async getAll(@Query() params: GetUsersDto) {
    return this.usersService.getAllByOptions(params);
  }
}
