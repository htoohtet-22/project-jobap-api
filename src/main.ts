import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const frontendUrl = configService.get<string>('FRONTEND_URL') ?? 'http://localhost:5173';
  const port = configService.get<number>('PORT') ?? 3001;
  
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
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`Jobap API running on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
}
bootstrap();
