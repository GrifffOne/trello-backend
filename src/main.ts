import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: ['http://localhost:3001'],
		credentials: true,
		exposedHeaders: 'set-cookie'
	})

	const config = new DocumentBuilder()
		.setTitle('Trello Doc')
		.setDescription('The Trello info')
		.setVersion('1.0')
		.addTag('trello')
		.build()

	const options = new DocumentBuilder().addBasicAuth()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('swagger', app, document)

	await app.listen(3000)
}
bootstrap()
