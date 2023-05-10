export type HelpingDataInputs = {
  type: string;
  label: string;
  name: keyof IProfileData;
}[];

export const helpingDataInputs: HelpingDataInputs = [
  { type: 'email', label: 'Почта', name: 'email' },
  { type: 'text', label: 'Логин', name: 'login' },
  { type: 'text', label: 'Имя', name: 'first_name' },
  { type: 'text', label: 'Фамилия', name: 'second_name' },
  { type: 'text', label: 'Имя в чате', name: 'display_name' },
  { type: 'phone', label: 'Телефон', name: 'phone' },
];
