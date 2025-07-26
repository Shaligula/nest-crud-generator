import { Injectable } from '@nestjs/common';
import { BookResponseDto } from './dto/response-book.dto';
import { BookDocument } from '../.././models/book.schema.ts';

@Injectable()
export class BookMapper {
  toBookResponseDto(book: BookDocument): BookResponseDto {
    return {
      _id: book._id.toString(),
      name: book.name,
      category: book.category,
      author: book.author,
      description: book.description,
      publicationYear: book.publicationYear,
      pages: book.pages,
      price: book.price,
      isAvailable: book.isAvailable,
      discount: book.discount,
      tags: book.tags,
      isbn: book.isbn,
      format: book.format,
      rating: book.rating,
      reviewsCount: book.reviewsCount,
      coverImage: book.coverImage,
    };
  }
}