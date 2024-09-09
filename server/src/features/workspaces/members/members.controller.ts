import { Controller } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('members')
@ApiTags('Members')
@ApiBearerAuth('accessToken')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
}
