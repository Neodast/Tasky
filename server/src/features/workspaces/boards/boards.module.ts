import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  imports: [ListsModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [],
})
export class BoardsModule {}
