import { BaseModel } from './base-model';

export class Book extends BaseModel {
  public title: string;
  public authorId: string;
  public price: number;
  public categoriesId: number[];
  public bookImage: FormData;
  public description: string;
}
