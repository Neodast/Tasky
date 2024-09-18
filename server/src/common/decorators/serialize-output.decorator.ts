import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { SerializeOutputInterceptor } from '../interceptors/serialize-output.interceptor';

export function SerializeOutput<T>(dto: ClassConstructor<T>) {
  return applyDecorators(UseInterceptors(new SerializeOutputInterceptor(dto)));
}
