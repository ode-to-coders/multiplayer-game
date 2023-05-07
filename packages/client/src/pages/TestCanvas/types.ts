import { Dispatch, SetStateAction } from 'react'

export type TMainGamer = {
  entourage: 'england' | 'modern' | 'fantasy',
  nameEntourage: 'Викторианская Англия' | 'Современность' | 'Фэнтези',
  numsVoicesWinEntourage: number,
  numsRivals: number,
  namesRivals: string[],
  notes: (number | string | '✔' | '✖' | null)[][],
  selectedCards: number[]
}
export type TCardQuestion = { 
  open: boolean, 
  type: 'black' | 'england' | 'modern' | 'fantasy', 
  index: number
}
export type TScenes = {
  set: Dispatch<SetStateAction<number>> | null,
  active: number
}

export type TTimerData = {
  nameId: string | number,
  seconds: number,
  cback: () => void
}
