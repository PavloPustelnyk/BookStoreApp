import { Book } from '../_simplified/book';
import { BaseModel } from '../_simplified/base-model';

export class AuthorDetailed extends BaseModel {
  public firstName: string;
  public lastName: string;
  public birthDate: Date;
  public authorImage: string;
  public description: string;
  public books: Book[];
}
