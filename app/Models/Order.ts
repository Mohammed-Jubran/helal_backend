import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {

  public static table ='orders'

  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"user_id"})
  public userId: number;

  @column({serializeAs:"order_date"})
  public orderDate: DateTime;

  @column({serializeAs:"total"})
  public total: number;

  @column({serializeAs:"sub_total"})
  public subTotal: number;

  @column({ serializeAs: "payment_method_id" })
  public paymentMethodId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
