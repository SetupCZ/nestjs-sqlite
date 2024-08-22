import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, validateSync } from 'class-validator';

class ConfigSchema {
  constructor(config: Record<string, unknown>) {
    this.DATABASE_CONNECTION_STRING =
      config.DATABASE_CONNECTION_STRING as string;
  }

  @IsNotEmpty()
  public readonly DATABASE_CONNECTION_STRING: string;
}

export type TConfigService = ConfigService<ConfigSchema, true>;

export const validateConfig = async (
  config: Record<string, unknown>,
): Promise<ConfigSchema> => {
  const configSchema = new ConfigSchema(config);
  const validationErrors = validateSync(configSchema);

  if (validationErrors.length) {
    throw new Error(validationErrors.toString());
  }

  return configSchema;
};
