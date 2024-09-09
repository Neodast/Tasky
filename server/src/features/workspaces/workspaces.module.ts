import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { MembersModule } from './members/members.module';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [MembersModule, BoardsModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  exports: [],
})
export class WorkspacesModule {}
