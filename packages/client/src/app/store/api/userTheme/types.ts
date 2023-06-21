export interface ITheme {
  theme: string;
  ownerId: number;
  id: number,
}

export interface ICreateUserTheme {
  theme: string;
  ownerId?: number;
}
