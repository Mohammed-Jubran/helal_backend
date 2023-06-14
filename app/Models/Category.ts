import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {

  public static table ='categories'

  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"name"})
  public name: string;

  @column({serializeAs:"name_ar"})
  public nameAr: string;

  @column({serializeAs:"image"})
  public image: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
