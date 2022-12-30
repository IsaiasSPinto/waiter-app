import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Container, CategoriesConteiner, MenuContainer, Footer, FooterConteiner } from './styles';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

export function Main() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	function onResetOrder() {
		setCartItems([]);
		setSelectedTable('');
	}

	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	function handleAddToCart(product: Product) {
		if (!selectedTable) {
			setIsModalVisible(true);
		}

		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartItem => cartItem.product._id === product._id
			);

			if (itemIndex < 0) {
				return prevState.concat({
					quantity: 1,
					product,
				});
			}

			const newCartItems = [...prevState];
			const item = newCartItems[itemIndex];

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity + 1,
			};

			return newCartItems;
		});
	}

	function handleDecrement(product: Product) {
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartItem => cartItem.product._id === product._id
			);

			const item = prevState[itemIndex];
			const newCartItems = [...prevState];

			if (item.quantity === 1) {
				newCartItems.splice(itemIndex, 1);

				return newCartItems;
			}

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity - 1,
			};

			return newCartItems;
		});
	}


	return (
		<>
			<Container>
				<Header onCancel={onResetOrder} table={selectedTable}></Header>

				<CategoriesConteiner>
					<Categories></Categories>
				</CategoriesConteiner>

				<MenuContainer>
					<Menu onSelectProduct={(item) => handleAddToCart(item)}></Menu>
				</MenuContainer>

			</Container>
			<Footer>
				<FooterConteiner>
					{!selectedTable && (
						<Button onPress={() => setIsModalVisible(true)}>Novo Pedido</Button>
					)}

					{selectedTable && (
						<Cart
							cartItems={cartItems}
							onAdd={handleAddToCart}
							onDecrement={handleDecrement}
							onConfirmOrder={onResetOrder}
						/>
					)}
				</FooterConteiner>
			</Footer>

			<TableModal onSave={(table) => handleSaveTable(table)} visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
		</>
	);
}
