import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

export class BaseBookDto {
  
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(64)
  name: string;
  
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;
  
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  author: string;
  
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  description?: string;
  
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(9999)
  publicationYear: number;
  
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10000)
  pages: number;
  
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
  
  @ApiProperty({
    type: Boolean,
    required: true,
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;
  
  @ApiProperty({
    type: Number,
    required: true,
    default: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
  
  @ApiProperty({
    type: [String],
    required: false,
    default: [],
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
  
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/)
  isbn?: string;
  
  @ApiProperty({
    enum: ['hardcover', 'paperback', 'ebook', 'audiobook'],
    required: false,
    default: 'paperback',
  })
  @IsOptional()
  @IsEnum(['hardcover', 'paperback', 'ebook', 'audiobook'])
  format?: string;
  
  @ApiProperty({
    type: Number,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;
  
  @ApiProperty({
    type: Number,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  reviewsCount?: number;
  
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

}