import { Text } from '../Text';
import { Category, Icon } from './styles';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { Category as CategoryType } from '../../types/Category';

interface CategoriesProps {
	categories: CategoryType[];
	onSelectedCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectedCategory }: CategoriesProps) {
	const [selectedCategory, setSelectedCategory] = useState('');

	function handleSelectCategory(categoryID: string) {
		const category = selectedCategory === categoryID ? '' : categoryID;
		setSelectedCategory(category);
		onSelectedCategory(category);
	}

	return (
		<FlatList
			horizontal
			contentContainerStyle={{ paddingRight: 24 }}
			showsHorizontalScrollIndicator={false}
			data={categories}
			keyExtractor={category => category._id}
			renderItem={({ item: category }) => {
				const isSelected = category._id === selectedCategory;

				return (
					<Category onPress={() => handleSelectCategory(category._id)}>
						<Icon>
							<Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
						</Icon>

						<Text opacity={isSelected ? 1 : 0.5} size={14} weight='600'>{category.name}</Text>
					</Category>
				);
			}}
		/>


	);
}
