import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class UsersController {

    public async getAll(ctx: HttpContextContract) {
        var result = await User.all();
        return result;
    }

    public async login(ctx: HttpContextContract) {
        var object = ctx.request.all();
        var email = object.email;
        var password = object.password;

        var result = await ctx.auth.attempt(email, password);
        return result;
    }


    public async logout(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        await ctx.auth.logout();
        return { message: "Logout" }
    }

    public async getMe({auth}: HttpContextContract) {
        var authObject = await auth.authenticate();
        var user = await User.findOrFail(authObject.id);
        return user;
    }

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            full_name: schema.string(),
            email: schema.string({}, [
                rules.email(),
                rules.unique({
                    table: 'users',
                    column: 'email',
                })
            ]),
            password: schema.string(),
            phone: schema.string(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var user = new User();
        user.fullName = fields.full_name;
        user.email = fields.email;
        user.password = fields.password;
        user.phone = fields.phone;
        var result = await user.save();
        return result;
    }

    async update({ auth, request, response }: HttpContextContract) {

        try {
            var authObject = await auth.authenticate();
            const createSchema = schema.create({
                email: schema.string([
                    rules.email(),
                ]),
                full_name: schema.string([
                    rules.minLength(2)
                ]),
                phone: schema.string(),
            });

            const payload = await request.validate({ schema: createSchema });
            const user = await User.findOrFail(authObject.id);
            user.fullName = payload.full_name;
            user.email = payload.email;
            user.phone = payload.phone;
            await user.save();
            return user;
        } catch (ex) {
            console.log(ex);
            return response.badRequest({ message: ex.toString() });
        }
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var user = await User.findOrFail(id);
        await user.delete();
        return { message: "The user has been deleted!" };
    }

}
