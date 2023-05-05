// таймеры (время показа) сцен в секундах
export enum TIMESCENES { 
  selectWishEntourage = 15,
  winEntourage = 4,
  selectProf = 15,
  selectSecret = 15,
  fiveClose = 2,
  fiveOpen = 2,
  myAnswer = 30,
  gamersAnswers = 30,
  finalAnswer = 30,
  finalResult = 15
}

// порядок сцен
export enum GAMESCENES {
  selectWishEntourage = 1,
  winEntourage = 2,
  selectProf = 3,
  selectSecret = 4,
  fiveClose = 5,
  fiveOpen = 6,
  myAnswer = 7,
  gamersAnswers = 8,
  finalAnswer = 9,
  finalResult = 10
}

export enum NAMESCENES {
  selectWishEntourage = 'selectWishEntourage',
  winEntourage = 'winEntourage',
  select = 'select',
  fiveClose = 'fiveClose',
  fiveOpen = 'fiveOpen',
  myAnswer = 'myAnswer',
  gamersAnswers = 'gamersAnswers',
  finalAnswer = 'finalAnswer',
  finalResult = 'finalResult'
}

export enum JSCOLORS {
  null = 'transparent',
  black = 'black',
  black_40 = 'rgba(0, 0, 0, 0.4)',
  white = 'white',
  green = 'green',
  green_05 = 'rgba(0, 255, 0, 0.05)',
  green_30 = 'rgba(146, 252, 12, 0.3)',
  red = 'red',
  orange = 'orange',
  orange_20 = 'rgba(252, 146, 12, 0.2)',
  yellow = 'yellow',
  blue = 'blue',
  grey = 'grey',
  manyGrey = '#242729'
}

export enum FONTS {
  mainCanvas = 'Arial Narrow'
}
