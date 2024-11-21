import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, validateSync } from 'class-validator';

class ConfigSchema {
  constructor(config: Record<string, unknown>) {
    this.ENVIRONMENT = (config.ENVIRONMENT as string) ?? 'development';

    this.DATABASE_CONNECTION_STRING =
      config.DATABASE_CONNECTION_STRING as string;

    this.JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;

    this.JWT_EXPIRES_IN = (config.JWT_EXPIRES_IN as string) ?? '60m';
  }

  @IsNotEmpty()
  public readonly ENVIRONMENT: string;

  @IsNotEmpty()
  public readonly DATABASE_CONNECTION_STRING: string;

  @IsNotEmpty()
  public readonly JWT_SECRET_KEY: string;

  @IsNotEmpty()
  public readonly JWT_EXPIRES_IN: string;
}

export type TConfigService = ConfigService<ConfigSchema, true>;

export const validateConfig = (
  config: Record<string, unknown>,
): ConfigSchema => {
  const configSchema = new ConfigSchema(config);
  const validationErrors = validateSync(configSchema);

  if (validationErrors.length) {
    throw new Error(validationErrors.toString());
  }

  return configSchema;
};
