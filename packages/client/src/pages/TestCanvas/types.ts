import { Dispatch, SetStateAction } from 'react'
import { SelectWishEntourage, WinEntourage, SelectCard, FiveQuestions, WriteAnswer, AnswersAndThink, FinalThink } from './scenes'

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
  set: Dispatch<SetStateAction<number>> | null;
  active: number;
  selectWishEntourage: InstanceType<typeof SelectWishEntourage>,
  winEntourage: InstanceType<typeof WinEntourage>,
  selectCard: InstanceType<typeof SelectCard>,
  fiveQuestions: InstanceType<typeof FiveQuestions>,
  writeAnswer: InstanceType<typeof WriteAnswer>,
  answersAndThink: InstanceType<typeof AnswersAndThink>,
  finalThink: InstanceType<typeof FinalThink>
};

export type TTimerData = {
  nameId: string | number,
  seconds: number,
  cback: () => void
}
