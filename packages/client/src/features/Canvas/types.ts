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
  open?: boolean, 
  type: 'black' | 'england' | 'modern' | 'fantasy', 
  index: number
}

export type TScenes = {
  set: Dispatch<SetStateAction<number>>;
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
  drawOff?: boolean,
  cback: () => void
}

export interface IRect {
  left: number, 
  top: number,
  width: number, 
  height: number,
  radius?: number,
  color?: string,
  borderColor?: string
}

export type TText = {
  text: string,
  textColor?: string,
  fontSize?: number
}

export type TImgBord = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius?: number;
  borderPadding?: number;
  color?: string;
  borderColor?: string;
  shadowOn?: boolean;
  shadowColor?: string;
  cback?: () => void;
}

export interface paramsDrawText {
  left: number, 
  top: number, 
  width?: number, 
  height?: number, 
  text: string | number | null, 
  textColor?: string, 
  fontSize?: number,
  textAlign?: 'left' | 'center'
}

export type TObjParamsDrawText = {
  [key in string]: paramsDrawText
}

export interface IobjLogWritingsText {
  [key: string]: string
}

export type TWritingsTextParams = {
  key: string,
  left: number,
  top: number,
  width: number,
  height: number,
  fontSize?: number,
  textColor?: string,
  validate?: RegExp
}
export interface IRectsWriteAndHover extends TWritingsTextParams {
  radius?: number,
  color?: string,
  borderColor?: string
}

export type IlogBack = {
  img: ImageData,
  l: number,
  t: number,
  h: number
} | null

export interface IobjLogBack {
  [key: string]: IlogBack[]
}

export type IhelpOffset = {
  left: number | null,
  top: number | null
}

export interface IobjHelpOffset {
  [key: string]: IhelpOffset
}

export type TTimerWithCback = {
  nameTimer: string | number,
  numsSeconds: number,
  fontSize?: number, 
  textColor?: string,
  countFloatNumbers?: 0 | 1 | 2,
  cback?: () => void,
} & (
  | {
    drawOff?: false | undefined;
    left: number; top: number; width: number; height: number;
  } | {
    drawOff: true;
    left?: number; top?: number; width?: number; height?: number;
  })

export type TTimerCash = {
  [key in string]: {
    timer: NodeJS.Timer | null, 
    counter: number, 
    checkEnd: boolean,
    checkCback: boolean,
    bgImg: ImageData | null
  }
}

export type TAnswers = {
  winEntourage: 'england' | 'modern' | 'fantasy',
}
