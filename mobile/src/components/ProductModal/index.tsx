import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import { Text } from "../Text";
import { Close } from "../Icons/Close";
import { formatCurency } from '../../utils/formatCurency';
import { Button } from "../Button";

import {
	IngredientContainer,
	ModalContent,
	ModalImage,
	CloseButton,
	Header,
	IngredientContent,
	Footer,
	FooterConteiner,
	PriceContainer
} from "./styles";


interface ProductModalProps {
	visible: boolean;
	onClose: () => void;
	product: Product | null;
	onSelectProduct: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onSelectProduct }: ProductModalProps) {
	if (!product) {
		return null;
	}

	function OnAddProduct(product: Product) {
		onSelectProduct(product);
		onClose();
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<ModalImage
				source={{
					uri: `http://192.168.1.5:3001/uploads/${product.imagePath}`,
				}}
			>
				<CloseButton onPress={onClose}>
					<Close />
				</CloseButton>
			</ModalImage>

			<ModalContent>
				<Header>
					<Text size={24} weight="600">{product.name}</Text>
					<Text color="#666" style={{ marginTop: 8 }}>{product.description}</Text>
				</Header>

				{product.ingredients.length > 0 && (
					<IngredientContainer>
						<Text color="#666" weight="600">Ingredientes</Text>

						<FlatList
							data={product.ingredients}
							style={{ marginTop: 16 }}
							keyExtractor={(item) => item._id}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<IngredientContent>
									<Text >{item.icon}</Text>
									<Text color="#666" size={14} style={{ marginLeft: 20 }}>
										{item.name}
									</Text>
								</IngredientContent>
							)}
						/>
					</IngredientContainer>
				)}

			</ModalContent>

			<Footer>
				<FooterConteiner>
					<PriceContainer>
						<Text color="#666">Preço</Text>
						<Text size={20} weight="600">{formatCurency(product.price)}</Text>
					</PriceContainer>

					<Button onPress={() => OnAddProduct(product)}>
						Adicionar ao pedido
					</Button>

				</FooterConteiner>
			</Footer>
		</Modal>
	);
}
