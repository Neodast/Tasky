import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { SerializeInputInterceptor } from '../interceptors/serialize-input.interceptor';
import { ClassConstructor } from 'class-transformer';

export function SerializeInput<T>(dto: ClassConstructor<T>) {
  return applyDecorators(UseInterceptors(new SerializeInputInterceptor(dto)));
}
