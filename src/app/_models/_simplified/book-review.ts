import { BaseModel } from './base-model';

export class BookReview extends BaseModel {
  public bookId: number;
  public rating: number;
  public comment: string;
}
