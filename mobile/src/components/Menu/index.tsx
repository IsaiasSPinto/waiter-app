import { useState } from 'react';
import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Product } from '../../types/Product';
import { formatCurency } from '../../utils/formatCurency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { ProductContainer, ProductDetails, ProductImage, Separator, AddToCartButton } from './styles';

interface MenuProps {
	onSelectProduct: (product: Product) => void;
	products: Product[];
}


export function Menu({ onSelectProduct, products }: MenuProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

	function handleSelectProduct(product: Product) {
		setSelectedProduct(product);
		setIsModalVisible(true);
	}

	return (
		<>
			<ProductModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				product={selectedProduct}
				onSelectProduct={onSelectProduct}
			/>

			<FlatList
				data={products}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item._id}
				style={{ marginTop: 32 }}
				contentContainerStyle={{ paddingHorizontal: 24 }}
				ItemSeparatorComponent={() => <Separator />}
				renderItem={({ item: product }) => (
					<ProductContainer onPress={() => handleSelectProduct(product)}>
						<ProductImage source={{
							uri: `http://192.168.1.5:3001/uploads/${product.imagePath}`,
						}} />
						<ProductDetails>
							<Text weight='600'>{product.name}</Text>
							<Text style={{ marginVertical: 8 }} color='#666' size={14}>{product.description}</Text>
							<Text size={14} color='#333' weight='600'>{formatCurency(product.price)}</Text>
						</ProductDetails>

						<AddToCartButton onPress={() => onSelectProduct(product)}>
							<PlusCircle />
						</AddToCartButton>

					</ProductContainer>
				)}
			/>
		</>
	);
}
