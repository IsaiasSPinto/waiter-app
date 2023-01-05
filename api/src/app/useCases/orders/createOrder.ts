import { Request, Response } from 'express';
import { io } from '../../..';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
	try {
		const { table, products } = req.body;

		const order = await Order.create({ table: table, products: products });
		const orderDetails = await order.populate('products.product');

		io.emit('newOrder', orderDetails);

		res.status(201).json(order);
	} catch {
		res.sendStatus(500);
	}

}
