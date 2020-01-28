import { BaseModel } from './base-model';

export class FavoriteBook extends BaseModel {
  public bookId: number;
  public userId: number;
}
