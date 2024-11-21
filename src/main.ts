import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import otelSDK from './instrumentation';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  otelSDK.start();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useLogger(app.get(PinoLogger));

  Logger.log(`Server running on http://localhost:3000`, 'Bootstrap');
  Logger.log(`OpenAPI running on http://localhost:3000/swagger`, 'Bootstrap');
  Logger.log(
    `Prometheus metrics running on http://localhost:9464/metrics`,
    'Bootstrap',
  );

  await app.listen(3000);
}

bootstrap();
