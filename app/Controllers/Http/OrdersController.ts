import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';
import OrderAddress from 'App/Models/OrderAddress';
import OrderDetail from 'App/Models/OrderDetail';

export default class OrdersController {


    public async getAll(ctx: HttpContextContract) {
        var result = await Order.all();
        return result;
    }
    
    public async getOrdersByUserId(ctx: HttpContextContract) {
        const userId = ctx.params.userId; // Assuming you can retrieve the user ID from the request parameters
        const orders = await Order.query().where('userId', userId);
        return orders;
      }
      

    async create({ request, response, auth }: HttpContextContract) {
        try {

            var authObject = await auth.authenticate();
            var data = request.all();

            var order = new Order();
            order.userId = authObject.id;
            order.orderDate = data.order_date;
            order.subTotal = data.sub_total;
            order.total = data.total;
            order.paymentMethodId = data.payment_method_id;
            var newOrder = await order.save();

            var address = new OrderAddress();
            address.country = data.address.country;
            address.city = data.address.city;
            address.area = data.address.area;
            address.street = data.address.street;
            address.buildingNo = data.address.building_no;
            address.longitude = data.address.longitude;
            address.latitude = data.address.latitude;
            address.orderId = newOrder.id;
            await address.save();


            var orderDetails: OrderDetail[] = data.products.map((product) => {
                var orderDetail = new OrderDetail();
                orderDetail.orderId = newOrder.id;
                orderDetail.productId = product.id;
                orderDetail.quantity = product.quantity;
                orderDetail.price = product.price;
                return orderDetail;
            });

            await OrderDetail.createMany(orderDetails);
            return newOrder.toJSON();
        } catch (ex) {
            console.log(ex);
            return response.badRequest({ message: ex });
        }
    }



}