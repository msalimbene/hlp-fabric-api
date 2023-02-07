import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('HLP Fabric API')
    .setDescription('The HLP Fabric interface API description')
    .setVersion('1.0')
    .addTag('fabric-api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const port = process.env.PORT || 3040;

  await app.listen(port, () => {
    Logger.log(`app booted on ${process.env.NODE_ENV} environment`, 'main.ts');
    Logger.log(`listening on ${port}`, 'main.ts');
  });
}
bootstrap();
