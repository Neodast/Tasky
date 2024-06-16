import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [MemberModule, BoardModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class WorkspaceModule {}
