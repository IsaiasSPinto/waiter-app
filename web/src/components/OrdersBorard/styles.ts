import styled from 'styled-components';


export const Board = styled.div`
	padding: 1rem;
	border: 1px #ccc solid;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;

	> header {
		padding: 0.5rem;
		font-size: 0.75rem;
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
`;

export const OrdersContanier = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 1.5rem;


	button {
		background: #fff;
		border: 1px #ccc solid;
		border-radius: 0.5rem;
		height: 128px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;

		strong  {
			font-weight: 500;
		}

		span {
			font-size: 0.75rem;
			color: #666;
		}

		& + button {
			margin-top: 1.5rem;
		}
	}
`;
