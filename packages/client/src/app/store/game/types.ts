export type UserChoice = {
  login: string,
  id: number,
  enthourage: string
}

export type UsersState = {
  users: {
    gameMembers: UserChoice[],
    login: string,
    vote: string,
  }
};

export type Voice = {
  login: string,
  vote: string,
}
