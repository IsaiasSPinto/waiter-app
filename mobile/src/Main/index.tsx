import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Container, CategoriesConteiner, MenuContainer, Footer, FooterConteiner } from './styles';


export function Main() {
	return (
		<>
			<Container>
				<Header></Header>

				<CategoriesConteiner>
					<Categories></Categories>
				</CategoriesConteiner>

				<MenuContainer>
					<Menu></Menu>
				</MenuContainer>

			</Container>
			<Footer>
				<FooterConteiner>
					<Button onPress={() => alert('novo Pedido')}>Novo Pedido</Button>
				</FooterConteiner>
			</Footer>
		</>
	);
}
