import { IRectsWriteAndHover, IobjLogWritingsText, TObjParamsDrawText, TTimerCash } from 'shared/utils/canvas/types';
import { NAMESCENES } from './const';
import { TCardQuestion, TMainGamer } from './types';
import { source } from 'shared/const/gameLibrary/dataLibrary';

class SessionData {

  // сюда записываются выбранный антураж и данные выбора игрока для блокнота
  private baseMainGamer: TMainGamer = {
    entourage: 'england', // этот антураж-мок можно оставить здесь, он все равно поменяется
    nameEntourage: 'Викторианская Англия', // аналогично
    numsVoicesWinEntourage: 0,
    numsRivals: 0, // количество соперников . если 0 - значит есть только сам игрок
    namesRivals: [], // имена соперников
    selectedCards: [ // индексы (TODO или номера) выбранных карт: [выбранная профессия, тайна, невыбранная профессия, тайна]
      0, 0, 1, 1
    ],
    // TODO приходить должно количество игроков.. и в зависимости от этого создавать размеры массивов (1 игрок = 2 местам)
    notes: [ // блокнот игрока сюда помещать массивы при инициализации - один массив - одна строка блокнота.
    // (первые 5 строк-массивов в блокноте беку не нужно пулять)
    // в notes[5] массив c 5 индексом пишутся - окончательные ответы игрока - их нужно отправить на бек для сверки в конце
    // в notes[6] массив принимаются в конце правильно или неправильно угадал игрок [false, true, false....]
    ]
  }

  private baseHoverRects: {[key in string]: IRectsWriteAndHover[]} = {
    [NAMESCENES.selectWishEntourage]: [
      {key: 'entourageLeft', left: 30, top: 85, width: 450, height: 229},
      {key: 'entourageBottom', left: 287, top: 380, width: 450, height: 229},
      {key: 'entourageRight', left: 544, top: 85, width: 450, height: 229}
    ],
    [NAMESCENES.select]: [
      {key: 'selectLeft', left: 85, top: 80, width: 357, height: 536},
      {key: 'selectRight', left: 572, top: 80, width: 357, height: 536}
    ],
    [NAMESCENES.myAnswer]: [ // разворачивается динамически
      {key: '', left: 50, top: 515, width: 924, height: 105}
    ],
    [NAMESCENES.gamersAnswers]: [ // разворачивается динамически
      {key: '', left: 473, top: 458, width: 50.5, height: 19.5}
    ],
    [NAMESCENES.finalAnswer]: [ // разворачивается динамически
      {key: '', left: 48, top: 163, width: 52.8, height: 20.2}
    ],
  }  

  private baseCardsForSelect = {
    prof: [0, 1],  // сюда придут от бека индексы (TODO или номера) карт профессий и секретов для выбора игроку
    secret: [0, 1]
  }

  private baseDataFiveQuestions: TCardQuestion[] = [
    {open: false, type: 'black', index: 0},
    {open: false, type: 'england', index: 1},
    {open: false, type: 'fantasy', index: 2},
    {open: false, type: 'black', index: 5},
    {open: false, type: 'modern', index: 2},
  ]

  private baseCounterFiveQuestions = {
    openFive: 0,
    open: false
  }  
  private baseArrCardBack = [
    {left: 32, top: 110, width: 300, height: 197, src: source.cards.back[0]},
    {left: 360, top: 110, width: 300, height: 197, src: source.cards.back[1]},
    {left: 688, top: 110, width: 300, height: 197, src: source.cards.back[0]},
    {left: 200, top: 340, width: 300, height: 197, src: source.cards.back[1]},
    {left: 533, top: 340, width: 300, height: 197, src: source.cards.back[1]},
  ]

  private baseArrPlaceUsersAnswer = {
    topName: 70, topOffset: 110,
    left: 52, top: 100, width: 370, height: 72
  }
  private baseObjCoordsNotes = {
    topName: 430,
    left: 473, top: 475, width: 50.4, height: 19.5
  }

  private baseObjFinalCoordsNotes = {
    topName: 135,
    left: 48, top: 181, width: 52.8, height: 20.3,
    topProfAndSecrets: 331, offsetProfAndSecrets: 135
  }
  private baseObjFinalCoordsCards = {
    offset: 144,
    left: 32, top: 410, width: 129, height: 196
  }
  private baseRatio = {
    multiple: 1,
    leftOffset: 0,
    checkSuccessCalc: false
  }
  private baseTimers: TTimerCash = {};
  private baseRectsForScene: IRectsWriteAndHover[] = [];
  private baseAnswersOfGamers = {};
  private baseLogWritings: IobjLogWritingsText = {};
  private baseObjText: TObjParamsDrawText = {};
  private baseArrLoadedImgSrc: string[] = [];
  private baseArrLoadedImg: HTMLImageElement[] = [];
  
  public mainGamer = this.baseMainGamer;
  public timers = this.baseTimers; // {}
  public hoverRects = this.baseHoverRects;
  public rectsForScene = this.baseRectsForScene; // []
  public cardsForSelect = this.baseCardsForSelect;
  public dataFiveQuestions = this.baseDataFiveQuestions;
  public counterFiveQuestions = this.baseCounterFiveQuestions;
  public arrCardBack = this.baseArrCardBack;
  public answersOfGamers = this.baseAnswersOfGamers; // {}
  public arrPlaceUsersAnswer = this.baseArrPlaceUsersAnswer;
  public objCoordsNotes = this.baseObjCoordsNotes;
  public objFinalCoordsNotes = this.baseObjFinalCoordsNotes;
  public objFinalCoordsCards = this.baseObjFinalCoordsCards;
  // Логи для набранного текста..
  public logWritings = this.baseLogWritings; // {}
  public objText = this.baseObjText; // {}
  // Кеш изображений
  public arrLoadedImgSrc = this.baseArrLoadedImgSrc; // []
  public arrLoadedImg = this.baseArrLoadedImg; // []
  /**
   * объект с множителем и сдвигом для корректного расчёта соотношения сторон канваса
   * @prop m - множитель
   * @prop lofs - левый сдвиг
   * @prop checkSuccessCalc - перевести в true, когда m и lofs успешно пересчитаются
   */
  public ratio = {
    /**
     * множитель под динамический размер канваса
     */
    multiple: this.baseRatio.multiple,
    /**
     * левый сдвиг под динамический размер канваса
     */
    leftOffset: this.baseRatio.leftOffset,
    checkSuccessCalc: false
  }

  /**
   * Сбросить весь стор данных в начальное состояние
   * @param obj - объект с уточнением доп.очищения (кеш изображений)
   */
  public reset = (what?: {
    cashImg?: boolean
  }) => {
    this.mainGamer = this.baseMainGamer;
    this.timers = {};
    this.hoverRects = this.baseHoverRects;
    this.rectsForScene = [];
    this.cardsForSelect = this.baseCardsForSelect;
    this.dataFiveQuestions = this.baseDataFiveQuestions;
    this.counterFiveQuestions = this.baseCounterFiveQuestions;
    this.arrCardBack = this.baseArrCardBack;
    this.answersOfGamers = {};
    this.arrPlaceUsersAnswer = this.baseArrPlaceUsersAnswer;
    this.objCoordsNotes = this.baseObjCoordsNotes;
    this.objFinalCoordsNotes = this.baseObjFinalCoordsNotes;
    this.objFinalCoordsCards = this.baseObjFinalCoordsCards;
    this.logWritings = {};
    this.objText = {};
    if (what?.cashImg) {      
      this.arrLoadedImgSrc = [];
      this.arrLoadedImg = [];
    }
    this.ratio = this.baseRatio;
  }

  /**
   * Сбросить что-то одно из стора в начальное состояние
   */
  public resetOne = (nameData: keyof SessionData) => {
    if (!nameData.startsWith('base')) {
      const nameResetData = `base${nameData[0].toUpperCase()}${nameData.slice(1)}`;      
      this[nameData as keyof this] = this[nameResetData as keyof this];    
    }
  }
}

/**
 * Store Session Data (миниСтор): 
 * синглтон-инстанс класса SessionData с данными для сессии игры
 * 
 * @method ssd.reset() - сбросит все данные в начальное состояние
 * @method ssd.resetOne(свойство) - сбросить (не всегда очистить) в начальное состояние нужное свойство
 */
export const ssd = new SessionData();
