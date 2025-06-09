import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle('BENEFITS ADMIN')
        .setDescription('Esta é uma api focada no gerenciamento de vouchers e beneficios.')
        .setVersion('1.0')
        .addTag('BENEFITS ADMIN')
        .addGlobalResponse({
            status: 500,
            description: 'Internal server error',
        })
        .addBearerAuth()
        .build()

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.enableCors({
        origin: '*',
        credentials: true
    })

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
