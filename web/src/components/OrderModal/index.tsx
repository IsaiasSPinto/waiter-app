import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Orders';
import { formatCurency } from '../../utils/formatCurency';
import { useEffect } from 'react';
interface OrderModalProps {
	visible: boolean;
	order: Order | null;
	onClose: () => void;
	onCancelOrder: () => Promise<void>;
	isLoading: boolean;
	onChangeOrderStatus: () => Promise<void>;
}

export function OrderModal({ visible, order, onClose, onCancelOrder, isLoading, onChangeOrderStatus }: OrderModalProps) {
	if (!visible || !order) {
		return null;
	}

	const total = order.products.reduce((total, { product, quantity }) => {
		return total + (product.price * quantity);
	}, 0);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};

	}, [onClose]);

	return (
		<Overlay>
			<ModalBody>
				<header>
					<strong>Mesa 2</strong>
					<button type='button' onClick={onClose}>
						<img src={closeIcon} alt="close" />
					</button>
				</header>

				<div className="status-container">
					<small>Status do Pedido</small>
					<div>
						<span>
							{order.status === 'WAITING' && '🕒'}
							{order.status === 'IN_PRODUCTION' && '👨‍🍳'}
							{order.status === 'DONE' && '✅'}
						</span>
						<strong>
							{order.status === 'WAITING' && 'Fila de espera'}
							{order.status === 'IN_PRODUCTION' && 'Em preparação'}
							{order.status === 'DONE' && 'Pronto'}
						</strong>
					</div>
				</div>

				<OrderDetails>
					<strong>Itens</strong>

					<div className="order-items">
						{order.products.map(({ _id, product, quantity }) => (
							<div className="item" key={_id}>
								<img
									src={`http://localhost:3001/uploads/${product.imagePath}`}
									alt={product.name}
									width="56"
									height="28.51"
								/>

								<span className='quantity'>{quantity}X</span>

								<div className="product-details">
									<strong>{product.name}</strong>
									<span>{formatCurency(product.price)}</span>
								</div>
							</div>
						))}
					</div>

					<div className="total">
						<span>Total</span>
						<strong>{formatCurency(total)}</strong>
					</div>

				</OrderDetails>

				<Actions>

					{order.status !== 'DONE' && (
						<button
							className="primary"
							type='button'
							disabled={isLoading}
							onClick={onChangeOrderStatus}
						>
							<span>
								{order.status === 'WAITING' && '👨‍🍳'}
								{order.status === 'IN_PRODUCTION' && '✅'}
							</span>
							<strong>
								{order.status === 'WAITING' && 'Iniciar Produção!'}
								{order.status === 'IN_PRODUCTION' && 'Finalizar Pedido!'}

							</strong>
						</button>
					)}

					<button
						className="secondary"
						type='button'
						onClick={onCancelOrder}
						disabled={isLoading}
					>
						<strong>Cancelar Pedido</strong>
					</button>
				</Actions>
			</ModalBody>
		</Overlay>
	);
}
