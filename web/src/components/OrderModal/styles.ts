import styled from 'styled-components';


export const Overlay = styled.div`
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(4.5px);
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalBody = styled.div`
	width: 480px;
	background: #fff;
	border-radius: 8px;
	padding: 2rem;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		strong {
			font-size: 1.5rem;
		}

		button {
			border: 0;
			background: transparent;
			line-height: 0;
		}
	}

	.status-container {
		margin-top: 2rem;


		small {
			font-size: 0.875rem;
			opacity: 0.8;
		}

		div {
			margin-top: 0.5rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

`;

export const OrderDetails = styled.div`
	margin-top: 2rem;

	> strong {
		font-size: 0.875rem;
		font-weight: 500;
		opacity: 0.8;
	}

	.order-items {
		margin-top:1rem;
	}

	.item {
		display: flex;

		& + .item {
			margin-top: 1rem;
		}

		img {
			border-radius: 6px;
		}

		.quantity {
			font-size: 0.875rem;
			color: #666;
			display: block;
			min-width: 20px;
		}

		.product-details {
			margin-left: 0.25rem;

			strong {
				display: block;
				margin-bottom: 0.25rem;
			}

			span {
				font-size: 0.875rem;
				color: #666;
			}
		}
	}

	.total {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.5rem;

		span {
			font-weight: 500;
			opacity: 0.8;
			font-size: 0.875rem;
		}

	}

`;


export const Actions = styled.footer`
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin-top: 2rem;

	.primary {
		background: #333333;
		color: #fff;
		border: 0;
		border-radius: 3rem;
		padding: 0.75rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.secondary {
		color: #d73035;
		padding: 0.75rem 1.5rem;
		font-weight: bold;
		border: 0;
		background: transparent;
		margin-top: 0.75rem;
	}
`;

