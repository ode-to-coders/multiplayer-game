// таймеры (время показа) сцен в секундах
export enum TIMESCENES { 
  selectWishEntourage = 12,
  winEntourage = 3,
  selectProf = 5,
  selectSecret = 5,
  fiveClose = 2,
  fiveOpen = 2,
  myAnswer = 15,
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
  modern = 'blue',
  england = 'orange',
  fantasy = 'yellow',
  black = 'black',
  black_40 = 'rgba(0, 0, 0, 0.4)',
  white = 'white',
  green = 'green',
  lightGreen = 'rgb(100,255,100)',
  green_05 = 'rgba(0, 255, 0, 0.05)',
  green_30 = 'rgba(146, 252, 12, 0.3)',
  red = 'red',
  orange = 'orange',
  orange_20 = 'rgba(252, 146, 12, 0.2)',
  grey = 'grey',
  manyGrey = '#242729'
}

export enum FONTS {
  mainCanvas = 'Arial Narrow'
}
