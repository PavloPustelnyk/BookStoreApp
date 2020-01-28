import { BaseModel } from './base-model';

export class Author extends BaseModel {
  public firstName: string;
  public lastName: string;
  public birthDate: Date;
  public authorImage: FormData;
  public description: string;
}
