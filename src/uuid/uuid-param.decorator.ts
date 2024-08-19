import { ApiParam } from '@nestjs/swagger';

export const UuidParam = () =>
  ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID parameter',
    example: '123e4567-e89b-12d3-a456-426614174000',
  });
