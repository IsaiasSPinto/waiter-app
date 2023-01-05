import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';

import { router } from './router';

const app = express();

const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
	.then(() => {
		const port = 3001;

		app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', '*');
			next();
		});

		app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
		app.use(express.json());
		app.use(router);

		server.listen(port), () =>
			console.log(`🚀 Server is runnig on http://localhost:${port}`);
	})
	.catch(() => console.error('Could not connect to MongoDB'));

