import { ButtonGroupBase, ModalBase, TableBase } from '../../shared/ui';
import { reverseSort } from '../../shared/utils/helpers';

import roomRating from '../../mocks/roomRating.json';

import avatar from './avatar.png';

const tableNames = ['Место', 'Никнейм', 'Набрано очков'];

roomRating.sort(reverseSort);


export const ModalEnd = () => {
  return (
    <ModalBase title='Расследование завершено!'>
      <TableBase rows={roomRating} tableNames={tableNames} avatar={avatar} />
      <ButtonGroupBase />
    </ModalBase>
  );
};
