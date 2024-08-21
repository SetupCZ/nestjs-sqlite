import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, validateOrReject } from 'class-validator';

class ConfigSchema {
  @IsNotEmpty()
  public readonly DATABASE_CONNECTION_STRING: string;
}

export type TConfigService = ConfigService<ConfigSchema, true>;

export const validateConfig = (config: Record<string, unknown>): Promise<void> => {
  return validateOrReject(config);
};
