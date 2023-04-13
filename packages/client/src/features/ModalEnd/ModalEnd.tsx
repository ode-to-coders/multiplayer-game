import avatar from './avatar.png';
import roomRating from '../../mocks/roomRating.json';
import { ButtonGroupBase, ModalBase, TableBase } from '../../shared/ui';
import { reverseSort } from '../../shared/utils/helpers';

const tableNames = ['Место', 'Никнейм', 'Набрано очков'];

export const ModalEnd = () => {
  const a = roomRating.sort(reverseSort);
  console.log(a)
  return (
    <ModalBase title={'Расследование завершено!'}>
      <TableBase rows={roomRating} tableNames={tableNames} avatar={avatar} />
      <ButtonGroupBase />
    </ModalBase>
  );
};
