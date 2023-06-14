import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {

  public static table ='users'

  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"full_name"})
  public fullName: string;

  @column({serializeAs:"email"})
  public email: string;

  @column({serializeAs:"password"})
  public password: string;

  @column({serializeAs:"phone"})
  public phone: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
