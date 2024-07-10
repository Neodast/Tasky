import { Module } from '@nestjs/common';
import { ListsModule } from './list/lists.module';

@Module({
  imports: [ListsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BoardsModule {}
