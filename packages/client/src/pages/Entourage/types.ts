export interface IWinner {
  name: string
  value: number
}

export interface IUserVote {
  id: number
  login: string
  enthourage?: string
}

export interface IEnthourage {
  id: number
  src: string
  name: string
}
