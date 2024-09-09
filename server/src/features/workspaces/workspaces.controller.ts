import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('workspace')
@ApiTags('Workspaces')
@ApiBearerAuth('accessToken')
export class WorkspacesController {}
