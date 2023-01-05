import { ActivityIndicator } from 'react-native';
import { api } from '../utils/api';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Container, CategoriesConteiner, MenuContainer, Footer, FooterConteiner, CenteredContainer } from './styles';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { useEffect, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';


export function Main() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);

	useEffect(() => {

		Promise.all([
			api.get('/categories'),
			api.get('/products')
		]).then(([categoriesResponse, productsResponse]) => {
			setCategories(categoriesResponse.data);

			setProducts(productsResponse.data);

			setIsLoading(false);
		});

	}, []);

	async function handleSelectCategory(categoryId: string) {
		const route = !categoryId ? '/products' : `/categories/${categoryId}/products`;
		setIsLoadingProducts(true);
		const { data } = await api.get(route);


		setProducts(data);
		setIsLoadingProducts(false);
	}

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

				{isLoading ? (
					<CenteredContainer>
						<ActivityIndicator size="large" color="#D73035" />
					</CenteredContainer>
				) : (
					<>
						<CategoriesConteiner>
							<Categories categories={categories} onSelectedCategory={handleSelectCategory}></Categories>
						</CategoriesConteiner>

						{isLoadingProducts ? (
							<CenteredContainer>
								<ActivityIndicator size="large" color="#D73035" />
							</CenteredContainer>
						) : (
							<>
								{products.length > 0 ? (
									<MenuContainer>
										<Menu onSelectProduct={(item) => handleAddToCart(item)} products={products}></Menu>
									</MenuContainer>
								) : (
									<CenteredContainer>
										<Empty />
										<Text weight='400' color="#666" style={{ marginTop: 24 }}>Nenhum produto foi encontrado!</Text>
									</CenteredContainer>
								)}
							</>
						)}

					</>
				)
				}

			</Container>
			<Footer>
				<FooterConteiner>
					{!selectedTable && (
						<Button
							onPress={() => setIsModalVisible(true)}
							disabled={isLoading}
						>
							Novo Pedido
						</Button>
					)}

					{selectedTable && (
						<Cart
							cartItems={cartItems}
							onAdd={handleAddToCart}
							onDecrement={handleDecrement}
							onConfirmOrder={onResetOrder}
							selectedTable={selectedTable}
						/>
					)}
				</FooterConteiner>
			</Footer>

			<TableModal onSave={(table) => handleSaveTable(table)} visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
		</>
	);
}
