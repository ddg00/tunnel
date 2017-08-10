import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { IoCostumAdapter } from './adapters/io-custom.adapter'

const app = NestFactory.create(ApplicationModule);
app.useWebSocketAdapter(new IoCostumAdapter());
app.listen(3000, () => console.log('Application is listening on port 3000.'));