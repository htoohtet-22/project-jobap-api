import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { get } from 'http';
import { createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const frontendUrl = configService.getOrThrow<string>('FRONTEND_URL');
  const port = Number(configService.getOrThrow<string>('PORT'));
  
  app.enableCors({
    origin: frontendUrl,
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Jobap API')
    .setDescription('Job Application Tracker API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customJs: [
      '/swagger-assets/swagger-ui-bundle.js',
      '/swagger-assets/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: '/swagger-assets/swagger-ui.css',
  });

  await app.listen(port);
  console.log(`Jobap API running on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api`);
}
bootstrap();
