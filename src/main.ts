import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle('BENEFITS ADMIN')
        .setDescription('API para gerenciamento de vouchers e benefícios.')
        .setVersion('1.0.0')
        .addTag('BENEFITS ADMIN')
        .addGlobalResponse({
            status: 500,
            description: 'Internal server error',
        })
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document,{
        swaggerOptions:{
            persistAuthorization: true,
            displayRequestDuration: true
        }
    });

    app.enableCors({
        origin: '*',
        credentials: true
    })

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
