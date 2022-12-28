import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Input, ModalBody, ModalForm, ModalHeader, Overlay } from './style';

interface TableModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
	const [table, setTable] = useState('');

	function handleSave(table: string) {
		setTable('');
		onSave(table);
		onClose();
	}

	return (
		<Modal transparent visible={visible} animationType="fade">
			<Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
				<ModalBody>
					<ModalHeader>
						<Text weight='600'>Informe a mesa</Text>
						<TouchableOpacity onPress={onClose}>
							<Close color='#666' />
						</TouchableOpacity>
					</ModalHeader>

					<ModalForm>
						<Input
							value={table}
							keyboardType='number-pad'
							placeholder='Número da mesa'
							placeholderTextColor='#666'
							onChangeText={text => setTable(text)}
						/>

						<Button disabled={table.length === 0} onPress={() => handleSave(table)}>
							Salvar
						</Button>
					</ModalForm>
				</ModalBody>
			</Overlay>
		</Modal>
	);
}
