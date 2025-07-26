import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { BaseBookDto } from './base-book.dto';

class AdditionalBookPagination {

  @ApiProperty({
    type: Number,
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty({
    type: Number,
    required: false,
    minimum: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(10)
  limit?: number;
  
}

export class GetBookListDto extends IntersectionType(
  PartialType(BaseBookDto),
  AdditionalBookPagination,
) {}