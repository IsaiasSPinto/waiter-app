import { useState } from 'react';
import { Order } from '../../types/Orders';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContanier } from './styles';
import { toast } from 'react-toastify';

interface OrdersBoardProps {
	title: string;
	icon: string;
	orders?: Order[];
	onCancelOrder: (orderID: string) => void;
	onChangeOrderStatus: (orderID: string, newStatus: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders = [], onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handleChangeOrderStatus() {
		setIsLoading(true);

		const newStatus = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

		await api.patch(`/orders/${selectedOrder?._id}`, {
			status: newStatus
		});

		toast.success(`O Pedido da mesa ${selectedOrder?.table} teve o status alterado!`);

		onChangeOrderStatus(selectedOrder!._id, newStatus);
		setIsLoading(false);
		setIsOpen(false);
	}


	async function handleCancelOrder() {
		setIsLoading(true);
		await api.delete(`orders/${selectedOrder?._id}`);

		toast.success(`O Pedido da mesa ${selectedOrder?.table} foi cancelado!`);

		setIsLoading(false);
		onCancelOrder(selectedOrder!._id);
		setIsOpen(false);
	}

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
			<OrderModal
				visible={isOpen}
				order={selectedOrder}
				onClose={handleCloseModal}
				onCancelOrder={handleCancelOrder}
				isLoading={isLoading}
				onChangeOrderStatus={handleChangeOrderStatus}
			/>

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
