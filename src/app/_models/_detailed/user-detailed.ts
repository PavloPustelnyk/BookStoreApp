import { Book } from '../_simplified/book';

export class UserDetailed {
  public email: string;
  public firstName: string;
  public lastName: string;
  public birthDate: Date;
  public likedBooks: Book[];
}
