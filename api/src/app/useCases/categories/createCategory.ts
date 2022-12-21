import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
	try {
		const { name, icon } = req.body;

		if (!name || !icon) {
			return res.sendStatus(400).json({ error: 'Missing required fields' });
		}

		const category = await Category.create({ name, icon });

		res.json(category);
	} catch {
		res.sendStatus(500);
	}

}
