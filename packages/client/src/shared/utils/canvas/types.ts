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
  text: string, 
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
