import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
// import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type, Accept,Authorization,X-API-Key, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(passport.initialize());

  // app.use(
  //   ['/api-docs'],
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
  //     },
  //   }),
  // );

  // const options = new DocumentBuilder()
  //   .setTitle('Ada Derana Tamil Client API Documentation')
  //   .setVersion('1.0')
  //   .addServer('http://localhost:8080/', 'Local environment')
  //   .addServer(
  //     'http://3.85.27.248:3000/',
  //     'Development environment',
  //   )
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api-docs', app, document);

  app.use(cookieParser());

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
