import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import OrderDetail from 'App/Models/OrderDetail';

export default class OrderDetailsController {

    public async getAll(ctx: HttpContextContract) {
        var result = await OrderDetail.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await OrderDetail.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            order_id: schema.number(),
            product_id: schema.number(),
            quantity: schema.number(),
            price: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var orderDetail = new OrderDetail();
        orderDetail.orderId = fields.order_id;
        orderDetail.productId = fields.product_id;
        orderDetail.quantity = fields.quantity;
        orderDetail.price = fields.price;
        var result = await orderDetail.save();
        return result;
    }

    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            order_id: schema.number(),
            product_id: schema.number(),
            quantity: schema.number(),
            price: schema.number(),
            id: schema.number()
        });
        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var orderDetail = await OrderDetail.findOrFail(id);
        orderDetail.orderId = fields.order_id;
        orderDetail.productId = fields.product_id;
        orderDetail.quantity = fields.quantity;
        orderDetail.price = fields.price;
        var result = await orderDetail.save();
        return result;
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var orderDetail = await OrderDetail.findOrFail(id);
        await orderDetail.delete();
        return { message: "The order Detail has been deleted!" };
    }

}
