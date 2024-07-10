import { Module } from '@nestjs/common';
import { BoardsModule } from './board/boards.module';
import { MembersModule } from './member/members.module';

@Module({
  imports: [MembersModule, BoardsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class WorkspacesModule {}
