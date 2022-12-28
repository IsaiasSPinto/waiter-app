import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Container, CategoriesConteiner, MenuContainer, Footer, FooterConteiner } from './styles';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';


export function Main() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');

	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	return (
		<>
			<Container>
				<Header onCancel={() => setSelectedTable('')} table={selectedTable}></Header>

				<CategoriesConteiner>
					<Categories></Categories>
				</CategoriesConteiner>

				<MenuContainer>
					<Menu></Menu>
				</MenuContainer>

			</Container>
			<Footer>
				<FooterConteiner>
					{!selectedTable && (
						<Button onPress={() => setIsModalVisible(true)}>Novo Pedido</Button>
					)}
				</FooterConteiner>
			</Footer>

			<TableModal onSave={(table) => handleSaveTable(table)} visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
		</>
	);
}
