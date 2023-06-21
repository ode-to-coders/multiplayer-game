import { ButtonGroupBase, ModalBase, TableBase } from '../../shared/ui';
import { reverseSort } from '../../shared/utils/helpers';

import roomRating from '../../mocks/roomRating.json';

import avatar from './avatar.png';

const tableNames = ['Место', 'Никнейм', 'Набрано очков'];

roomRating.sort(reverseSort);

export const ModalEnd = (props: any) => {
  const {
    ratings
  } = props;
  ratings.sort(reverseSort);
  return (
    <ModalBase title="Расследование завершено!">
      <TableBase rows={ratings} tableNames={tableNames} avatar={avatar} />
      <ButtonGroupBase />
    </ModalBase>
  );
};
