import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    { transform: true,
      whitelist : true
    }
  ));
  app.enableCors({
    origin: 'http://localhost:3000'
  })
  // app.setGlobalPrefix('api/v1')
 
  // NB: enable sessions
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie:{
  //       maxAge: 600000000,
  //     }
  //   }),
  // );
  
  // // enable passport with session
  // app.use(passport.initialize());
  // app.use(passport.session());


  // NB: swaggar configuration
  const config = new DocumentBuilder()
  .setTitle('management system API')
  .setDescription('management system')
  .setVersion('1.0.0')
  .addTag('users')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Token',
    }, 'access-token',
  )
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // calling listening port from .env
  const Port = process.env.LISTENING_PORT || 7000
  await app.listen(Port, ()=> console.log(`listening on port:${Port}`));
}
bootstrap();

