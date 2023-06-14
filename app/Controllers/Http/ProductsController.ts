import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product';

export default class ProductsController {

    public async getAll(ctx: HttpContextContract) {
        var result = await Product.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Product.findOrFail(id);
        return result;
    }

      public async getByCategoryId(ctx: HttpContextContract) {
        const categoryId = ctx.params.categoryId;
        const products = await Product.query().where('category_id', categoryId);
        return products;
      }

      public async getFeaturdProducts(ctx: HttpContextContract) {
        const products = await Product.query().where('active', 3);
        return products;
      }
      
      

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            name: schema.string(),
            name_ar: schema.string(),
            size: schema.string(),
            price: schema.number(),
            image: schema.string(),
            category_id: schema.number(),
            active: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var product = new Product();
        product.name = fields.name;
        product.nameAr = fields.name_ar;
        product.size = fields.size;
        product.price = fields.price;
        product.image = fields.image;
        product.categoryId = fields.category_id;
        product.active = fields.active;
        var result = await product.save();
        return result;
    }

    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            name: schema.string(),
            name_ar: schema.string(),
            size: schema.string(),
            price: schema.number(),
            image: schema.string(),
            category_id: schema.number(),
            active: schema.number(),
            id: schema.number()
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var product = await Product.findOrFail(id);
        product.name = fields.name;
        product.nameAr = fields.name_ar;
        product.size = fields.size;
        product.price = fields.price;
        product.image = fields.image;
        product.categoryId = fields.category_id;
        product.active = fields.active;
        var result = await product.save();
        return result;
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var product = await Product.findOrFail(id);
        await product.delete();
        return { message: "The product has been deleted!" };
    }

}
