import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookMapper } from './book.mapper';
import { Book, BookSchema } from '../.././example/models/book.model.ts';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService, BookMapper],
})
export class BookModule {}
