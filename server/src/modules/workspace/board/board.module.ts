import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';

@Module({
  imports: [ListModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BoardModule {}
