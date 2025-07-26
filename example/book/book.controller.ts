
import { Body, Controller, Get, Param, Post, Patch, Delete, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookResponseDto } from './dto/response-book.dto';
import { GetBookListDto } from './dto/get-list-book.dto';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create book' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: BookResponseDto,
  })
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponseDto> {
    return this.bookService.create(createBookDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: BookResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto
  ): Promise<BookResponseDto> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book' })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<void> {
    this.bookService.delete(id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The found record',
    type: BookResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<BookResponseDto> {
    return this.bookService.findOne(id);
  }

  @Get('/all')
  @ApiOkResponse({
    description: 'The found records',
    type: [BookResponseDto],
  })
  async findAll(@Query() getBookListDto: GetBookListDto): Promise<BookResponseDto[]> {
    return this.bookService.findAll(getBookListDto);
  }

}