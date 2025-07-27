import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Book {
  @Prop({
    required: true,
    minlength: 5,
    maxlength: 64,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Category',
  })
  category: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Author',
  })
  author: string;

  @Prop({
    required: false,
    minlength: 5,
    maxlength: 1024,
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
    min: 0,
    max: 9999,
  })
  publicationYear: number;

  @Prop({
    required: true,
    min: 0,
    max: 10000,
  })
  pages: number;

  @Prop({
    required: true,
    min: 0,
    max: 1000000,
  })
  price: number;

  @Prop({
    required: true,
    default: false,
  })
  isAvailable: boolean;

  @Prop({
    required: true,
    min: 0,
    max: 100,
    default: 0,
  })
  discount: number;

  @Prop({
    type: [String],
    default: [],
  })
  tags: string[];

  @Prop({
    type: String,
    required: false,
    match: /^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/,
  })
  isbn: string;

  @Prop({
    type: String,
    enum: ['hardcover', 'paperback', 'ebook', 'audiobook'],
    default: 'paperback',
  })
  format: string;

  @Prop({
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  })
  rating: number;

  @Prop({
    type: Number,
    default: 0,
  })
  reviewsCount: number;

  @Prop({
    type: String,
    required: false,
  })
  coverImage: string;
}

export type BookDocument = HydratedDocument<Book>;

export const BookSchema = SchemaFactory.createForClass(Book);
