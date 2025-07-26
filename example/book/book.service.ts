import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../.././example/models/example.ts';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookListDto } from './dto/get-list-book.dto';
import { BookResponseDto } from './dto/response-book.dto';
import { BookMapper } from './book.mapper';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    private readonly bookMapper: BookMapper,
  ) {}

  async create(dto: CreateBookDto): Promise<BookResponseDto> {
    const book = await this.bookModel.create(dto);
    return this.bookMapper.toBookResponseDto(book);
  }

  async update(id: string, dto: UpdateBookDto): Promise<BookResponseDto> {
    const book = await this.bookModel.findByIdAndUpdate(id, dto, { new: true });
    if (!book) throw new NotFoundException('Book not found');
    return this.bookMapper.toBookResponseDto(book);
  }

  async delete(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Book not found');
  }

  async findOne(id: string): Promise<BookResponseDto> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return this.bookMapper.toBookResponseDto(book);
  }

  async findAll(query: GetBookListDto): Promise<BookResponseDto[]> {
    const { page = 1, limit = 10, ...filters } = query;

    const mongoQuery = Object.entries(filters).reduce((acc, [key, val]) => {
      if (val !== undefined && val !== null) acc[key] = val;
      return acc;
    }, {});

    const books = await this.bookModel
      .find(mongoQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return books.map((book) => this.bookMapper.toBookResponseDto(book));
  }
}