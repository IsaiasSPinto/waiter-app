import { Container } from './styles';
import { OrdersBoard } from '../OrdersBorard';
import { Order } from '../../types/Orders';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';


export function Orders() {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const io = socketIo('http://localhost:3001', {
			transports: ['websocket'],
		});

		io.on('newOrder', (order) => {
			setOrders(prevState => prevState.concat(order));
		});
	}, []);

	useEffect(() => {
		api.get('/orders').then((response) => {
			setOrders(response.data);
		});
	});

	const waiting = orders.filter((order) => order.status === 'WAITING');
	const preparing = orders.filter((order) => order.status === 'IN_PRODUCTION');
	const done = orders.filter((order) => order.status === 'DONE');

	function handleCancelOrder(orderID: string) {
		setOrders((prevState) => prevState.filter((order) => order._id !== orderID));
	}

	function handleUpdateOrder(orderID: string, newStatus: Order['status']) {
		setOrders((prevState) => prevState.map((order) => {
			if (order._id === orderID) {
				return {
					...order,
					status: newStatus
				};
			}

			return order;
		}));
	}

	return (
		<Container>
			<OrdersBoard
				icon='🕒'
				title='Fila de espera'
				orders={waiting}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleUpdateOrder}
			/>
			<OrdersBoard
				icon='👨‍🍳'
				title='Em preparação'
				orders={preparing}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleUpdateOrder}
			/>
			<OrdersBoard
				icon='✅'
				title='Pronto'
				orders={done}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleUpdateOrder}
			/>
		</Container>
	);
}
