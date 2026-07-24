import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET'],
  });

  const port = process.env.PORT ?? 3001;

  await app.listen(port);

  console.log(`Backend ejecutándose en http://localhost:${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('Error al iniciar el backend:', error);
  process.exit(1);
});
