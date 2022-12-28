import styled from "styled-components/native";


export const IngredientContainer = styled.View`
	margin-top: 32px;
	flex: 1;
`;
export const ModalContent = styled.View`
	padding: 32px 24px 0;
	flex: 1;
	background: #fafafa;
`;

export const ModalImage = styled.ImageBackground`
	width: 100%;
	height: 200px;
	align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
	width: 32px;
	height: 32px;
	background: rgba(0,0,0,0.5);
	border-radius: 16px;
	align-items: center;
	justify-content: center;
	margin: 24px;
`;

export const Header = styled.View`

`;

export const IngredientContent = styled.View`
	padding: 16px;
	flex-direction: row;
	border: 1px solid rgba(204,204,204,0.3);;
	border-radius: 8px;
	align-items: center;
	margin-bottom: 4px;
`;

export const Footer = styled.View`
	min-height: 110px;
	background: #fff;
	padding: 16px 24px;
`;

export const FooterConteiner = styled.SafeAreaView`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const PriceContainer = styled.View``;

