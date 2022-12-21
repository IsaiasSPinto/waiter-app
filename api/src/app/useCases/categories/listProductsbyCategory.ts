import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProductsbyCategory(req: Request, res: Response) {
	try {
		const { categoryId } = req.params;

		const products = await Product.find().where('category').equals(categoryId);

		return res.json(products);
	} catch (error) {
		res.sendStatus(500);
	}
}
