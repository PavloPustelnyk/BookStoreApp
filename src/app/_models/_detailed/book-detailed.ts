import { Author } from '../_simplified/author';
import { BaseModel } from '../_simplified/base-model';
import { Category } from '../_simplified/category';
import { BookReview } from '../_simplified/book-review';

export class BookDetailed extends BaseModel {
  public title: string;
  public authorId: string;
  public price: number;
  public reviewCount: number;
  public summaryRating: number;
  public bookImage: FormData;
  public description: string;
  public author: Author;
  public categories: Category[];
  public reviews: BookReview[];
}
