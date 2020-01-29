import { BaseModel } from './base-model';

export class Book extends BaseModel {
  public title: string;
  public authorId: number;
  public price: number;
  public categoriesId: number[];
  public bookImage: string;
  public description: string;
}
