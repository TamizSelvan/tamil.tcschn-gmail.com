import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [BooksModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
