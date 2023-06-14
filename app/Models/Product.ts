import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category';

export default class Product extends BaseModel {

  public static table ='products'

  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"name"})
  public name: string;

  @column({serializeAs:"name_ar"})
  public nameAr: string;

  @column({serializeAs:"price"})
  public price: number;

  @column({serializeAs:"size"})
  public size: string;

  @column({serializeAs:"image"})
  public image: string;

  @column({serializeAs:"category_id"})
  public categoryId: number;

  @column({serializeAs:"active"})
  public active: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
  
}
