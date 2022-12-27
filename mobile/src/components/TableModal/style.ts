import styled from "styled-components/native";

export const Overlay = styled.KeyboardAvoidingView`
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.6);
	flex: 1;
	padding: 0 24px;
`;

export const ModalBody = styled.View`
	background: #fafafa;
	border-radius: 8px;
	padding: 24px;
	width: 100%;

`;

export const ModalHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const ModalForm = styled.View`
	margin-top: 32px;

`;

export const Input = styled.TextInput`
	background: #fff;
	border: 1px solid rgba(204,204,204,0.5);
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 16px;
`;
