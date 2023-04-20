export type HelpingDataMain = {
  label: string,
  name: keyof IProfileData
}[]

export const arrHelpingData: HelpingDataMain = [
  {label: 'Почта', name: 'email'},
  {label: 'Логин', name: 'login'},
  {label: 'Имя', name: 'first_name'},
  {label: 'Фамилия', name: 'second_name'},
  {label: 'Имя в чате', name: 'display_name'},
  {label: 'Телефон', name: 'phone'}
]
