import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
	table: string;
	onCancel: () => void;
}

export function Header({ table, onCancel }: HeaderProps) {

	return (
		<Container>
			{!table && (
				<>
					<Text opacity={0.9} size={14}>Bem vindo(a) ao</Text>
					<Text size={24} weight="700">WAITER<Text size={24}>APP</Text></Text>
				</>
			)}

			{table && (
				<Content>
					<OrderHeader>
						<Text size={24} weight="600">Pedido</Text>
						<TouchableOpacity onPress={onCancel}>
							<Text size={14} weight="600" color='#D73035'>Cancelar Pedido</Text>
						</TouchableOpacity>
					</OrderHeader>
					<Table>
						<Text color="#666">Mesa {table}</Text>
					</Table>
				</Content>
			)}

		</Container>
	);

}
