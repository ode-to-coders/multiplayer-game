export type HelpingDataRoom = {
  type: string;
  placeholder: string;
  label: string;
  name: string;
}[];

export const arrInputsData: HelpingDataRoom = [
  {
    type: 'text',
    placeholder: 'Название',
    label: 'Название',
    name: 'name',
  },
  {
    type: 'text',
    placeholder: 'Количество игроков (2-6)',
    label: 'Количество игроков (2-6)',
    name: 'count',
  },
  {
    type: 'password',
    placeholder: 'Пароль',
    label: 'Пароль',
    name: 'password',
  },
];
