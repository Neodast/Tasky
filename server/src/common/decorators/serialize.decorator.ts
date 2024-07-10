import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

export function Serialize(dto: ClassConstructor<any>) {
  return applyDecorators(UseInterceptors(new SerializeInterceptor(dto)));
}
