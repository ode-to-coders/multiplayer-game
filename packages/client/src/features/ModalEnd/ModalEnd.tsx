import { style } from './style';

import avatar from './avatar.png';
import rows from './const/rows';
import { ButtonGroupBase, ModalBase, TableBase } from '@/shared/ui';

const tableNames = ['Место', 'Никнейм', 'Набрано очков'];

export const ModalEnd = () => {
  return (
    <ModalBase title={'Расследование завершено!'}>
      <TableBase
        rows={rows}
        style={style}
        tableNames={tableNames}
        avatar={avatar}></TableBase>
      <ButtonGroupBase style={style}></ButtonGroupBase>
    </ModalBase>
  );
};
