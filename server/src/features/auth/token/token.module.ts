import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
