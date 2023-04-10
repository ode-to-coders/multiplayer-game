export type helpingDataInputsPassword = {
    type: string,
    placeholder: string,
    label: string,
    name: keyof IProfileEditPassword
  }[]

export const helpingDataInputs: helpingDataInputsPassword = [
  {type: "password", placeholder: "*******", label: "Старый пароль", name: "oldpassword"},
  {type: "password", placeholder: "*******", label: "Новый пароль", name: "password"},
  {type: "password", placeholder: "*******", label: "Повторите новый пароль", name: "password_repeat"}
]
