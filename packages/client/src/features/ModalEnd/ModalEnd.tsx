import avatar from './avatar.png';
import roomRating from '../../mocks/roomRating.json';
import { ButtonGroupBase, ModalBase, TableBase } from '../../shared/ui';

const tableNames = ['Место', 'Никнейм', 'Набрано очков'];

export const ModalEnd = () => {
  return (
    <ModalBase title={'Расследование завершено!'}>
      <TableBase rows={roomRating} tableNames={tableNames} avatar={avatar} />
      <ButtonGroupBase />
    </ModalBase>
  );
};
