import { PartialType } from '@nestjs/swagger';
import { BaseBookDto } from './base-book.dto';

export class UpdateBookDto extends PartialType(BaseBookDto) {}