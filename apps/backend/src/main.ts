import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Enable URI-based API versioning: routes will be served under /v1
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Local Community API')
    .setDescription('API documentation for the Local Community backend')
    .setVersion('v1')
    .addServer('/v1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Serve Swagger UI at /v1/docs
  SwaggerModule.setup('v1/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(3001);

  console.log(` Backend running on http://localhost:3001`);
  console.log(` Swagger UI available at http://localhost:3001/v1/docs`);
}
void bootstrap();
