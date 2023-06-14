import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category';

export default class CategoriesController {

    public async getAll(ctx: HttpContextContract) {
        var result = await Category.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Category.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            name: schema.string(),
            name_ar: schema.string(),
            image: schema.string(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var category = new Category();
        category.name = fields.name;
        category.nameAr = fields. name_ar;
        category.image = fields.image;
        var result = await category.save();
        return result;
    }

    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            name: schema.string(),
            name_ar: schema.string(),
            image: schema.string(),
            id: schema.number()
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var category = await Category.findOrFail(id);
        category.name = fields.name;
        category.nameAr = fields. name_ar;
        category.image = fields.image;
        var result = await category.save();
        return result;
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var categorie = await Category.findOrFail(id);
        await categorie.delete();
        return { message: "The categorie has been deleted!" };
    }

}
