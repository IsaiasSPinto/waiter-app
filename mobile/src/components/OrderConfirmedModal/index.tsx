import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { ModalConteiner, OKButton } from './styles';
import { StatusBar } from 'expo-status-bar';


interface OrderConfirmedModalProps {
	visible: boolean;
	onOk: () => void;
}


export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModalProps) {
	function OnOk() {
		onOk();
	}

	return (
		<Modal
			visible={visible}
			animationType="fade"
		>
			<StatusBar style="light" />
			<ModalConteiner>
				<CheckCircle />
				<Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
					Pedido confirmado
				</Text>
				<Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
					O Pedido já entrou na fila de produção!
				</Text>
				<OKButton onPress={OnOk}><Text weight="600" color="#D73035">OK</Text></OKButton>
			</ModalConteiner>
		</Modal>
	);
}
