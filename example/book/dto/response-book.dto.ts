import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { BaseBookDto } from './base-book.dto';

class AdditionalBookId {

  @ApiProperty({
    type: String,
    description: 'MongoDB ObjectId',
    required: true
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
  
}

export class BookResponseDto extends IntersectionType(
  BaseBookDto,
  AdditionalBookId,
) {}