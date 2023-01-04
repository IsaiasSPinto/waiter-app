import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import { formatCurency } from "../../utils/formatCurency";
import { Button } from "../Button";
import { Product } from "../../types/Product";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import {
	Item,
	ProductContainer,
	Actions,
	Image,
	QuantityContainer,
	ProductDetails,
	Summary,
	TotalContainer,
} from "./styles";
import { useState } from "react";

interface CartProps {
	cartItems: CartItem[];
	onAdd: (product: Product) => void;
	onDecrement: (product: Product) => void;
	onConfirmOrder: () => void;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder }: CartProps) {

	const [isLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const total = cartItems.reduce((acc, item) => {
		return acc + (item.product.price * item.quantity);
	}, 0);

	function handleOK() {
		onConfirmOrder();
		setIsModalVisible(false);
	}

	return (
		<>
			<OrderConfirmedModal
				visible={isModalVisible}
				onOk={handleOK}
			/>


			{cartItems.length > 0 && (
				<FlatList
					data={cartItems}
					style={{ marginBottom: 20, maxHeight: 150 }}
					keyExtractor={(item) => item.product._id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item: cartItem }) => (
						<Item>
							<ProductContainer>
								<Image source={{
									uri: `http://192.168.1.5:3001/uploads/${cartItem.product.imagePath}`,
								}} />

								<QuantityContainer>
									<Text size={14} color="#666">
										{cartItem.quantity}x
									</Text>

								</QuantityContainer>

								<ProductDetails>
									<Text size={14} weight="600">{cartItem.product.name}</Text>
									<Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurency(cartItem.product.price)}</Text>
								</ProductDetails>
							</ProductContainer>

							<Actions>
								<TouchableOpacity
									style={{ marginRight: 24 }}
									onPress={() => onAdd(cartItem.product)}
								>
									<PlusCircle />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
									<MinusCircle />
								</TouchableOpacity>
							</Actions>

						</Item>
					)}
				/>
			)}

			<Summary>
				<TotalContainer>
					{cartItems.length > 0 ? (
						<>
							<Text color="#666">Total</Text>
							<Text size={20} weight="600">{formatCurency(total)}</Text>
						</>
					) : (
						<Text color="#666">Seu carrinho está vazio</Text>
					)}
				</TotalContainer>

				<Button
					disabled={cartItems.length === 0}
					onPress={() => setIsModalVisible(true)}
					loading={isLoading}
				>
					Confirmar pedido
				</Button>
			</Summary>

		</>
	);
}
