import { useState } from 'react';
import { Order } from '../../types/Orders';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContanier } from './styles';

interface OrdersBoardProps {
	title: string;
	icon: string;
	orders?: Order[];
}

export function OrdersBoard({ icon, title, orders = [] }: OrdersBoardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	function handleOpenOrder(order: Order) {
		setSelectedOrder(order);
		setIsOpen(true);
	}

	function handleCloseModal() {
		setIsOpen(false);
		setSelectedOrder(null);
	}

	return (
		<Board>
			<OrderModal visible={isOpen} order={selectedOrder} onClose={handleCloseModal} />

			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>({orders.length})</span>
			</header>

			{orders.length > 0 && (
				<OrdersContanier>
					{orders.map(order => (
						<button onClick={() => handleOpenOrder(order)} key={order._id} type='button'>
							<strong>Mesa {order.table}</strong>
							<span>{order.products.length} itens</span>
						</button>
					))}
				</OrdersContanier>
			)}

		</Board>
	);
}
