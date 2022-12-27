import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurency } from '../../utils/formatCurency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { Product, ProductDetails, ProductImage, Separator, AddToCartButton } from './styles';

export function Menu() {
	return (
		<FlatList
			data={products}
			keyExtractor={(item) => item._id}
			style={{ marginTop: 32 }}
			contentContainerStyle={{ paddingHorizontal: 24 }}
			ItemSeparatorComponent={() => <Separator />}
			renderItem={({ item: product }) => (
				<Product>
					<ProductImage source={{
						uri: `http://192.168.1.5:3001/uploads/${product.imagePath}`,
					}} />
					<ProductDetails>
						<Text weight='600'>{product.name}</Text>
						<Text style={{ marginVertical: 8 }} color='#666' size={14}>{product.description}</Text>
						<Text size={14} color='#333' weight='600'>{formatCurency(product.price)}</Text>
					</ProductDetails>

					<AddToCartButton>
						<PlusCircle />
					</AddToCartButton>

				</Product>
			)}
		/>
	);
}
