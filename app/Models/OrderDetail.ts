import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderDetail extends BaseModel {

  public static table ='order_details'

  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"order_id"})
  public orderId: number;

  @column({serializeAs:"product_id"})
  public productId: number;

  @column({serializeAs:"quantity"})
  public quantity: number;

  @column({serializeAs:"price"})
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
