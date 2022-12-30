import styled from "styled-components/native";

export const ProductContainer = styled.View`
	padding: 8px 0;
	flex-direction: row;
`;

export const Item = styled.View`
	flex-direction: row;
	padding: 8px 0;
	align-items: center;
	justify-content: space-between;
`;

export const Actions = styled.View`
	flex-direction: row;
`;

export const Image = styled.Image`
	width: 48px;
	height: 48px;
	border-radius: 8px;
`;

export const QuantityContainer = styled.View`
	max-width: 20px;
	margin-left: 12px;
`;

export const ProductDetails = styled.View`
	margin-left: 8px;
`;

export const Summary = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const TotalContainer = styled.View`
	margin-right: 32px;
	flex: 1;
`;
