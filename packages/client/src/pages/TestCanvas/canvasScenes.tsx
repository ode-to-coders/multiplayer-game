import { IRectsWriteAndHover, TObjParamsDrawText } from 'shared/utils/canvas/types';
import { cards, questions, source } from 'shared/const/gameLibrary/dataLibrary';
import { drawRoundedRect, drawText, drawImgBorderText, settingHover, writingsText } from 'shared/utils/canvas/utilsDrawCanvas';
import { Dispatch, SetStateAction } from 'react';


enum GAMESCENES {
  selectProf = 1,
  selectSecret = 2,
  fiveClose = 3,
  fiveOpen = 4,
  myAnswer = 5,
  gamersAnswers = 6,
  finalAnswer = 7,
  finalResult = 8
}

enum NAMESCENES {
  select = 'select',
  fiveClose = 'fiveClose',
  fiveOpen = 'fiveOpen',
  myAnswer = 'myAnswer',
  gamersAnswers = 'gamersAnswers',
  finalAnswer = 'finalAnswer',
  finalResult = 'finalResult'
}

enum TIMESCENES {  
  selectProf = 5,
  selectSecret = 5,
  fiveClose = 2,
  fiveOpen = 2,
  myAnswer = 2,
  gamersAnswers = 1,
  finalAnswer = 15,
  finalResult = 15
}

const hoverRects: {[key in string]: IRectsWriteAndHover[]}  = {
  [NAMESCENES.select]: [
    {key: 'selectLeft', left: 85, top: 80, width: 347, height: 526},
    {key: 'selectRight', left: 572, top: 80, width: 347, height: 526}
  ],
  [NAMESCENES.myAnswer]: [
    {key: '', left: 50, top: 515, width: 924, height: 105}
  ],
  [NAMESCENES.gamersAnswers]: [
    {key: '', left: 473, top: 458, width: 50.5, height: 19.5}
  ],
  [NAMESCENES.finalAnswer]: [
    {key: '', left: 48, top: 163, width: 52.8, height: 20.2}
  ],
}

type TMainGamer = {
  antourage: 'england'/*  | 'modern' | 'fantasy' */, // раскомментировать, как добавится вся сжатая библиотека изображений карт
  notes: (number | string | '✔' | '✖' | null)[][],
  selectedCards: number[]
}
type TCardQuestion = { 
  open: boolean, 
  type: 'black' | 'england' | 'modern' | 'fantasy', 
  index: number
}
type TScenes = {
  set: Dispatch<SetStateAction<number>> | null,
  active: number
}
type TTimerData = {
  nameId: string | number,
  seconds: number,
  cback: () => void
}

export class CanvasScenes {

  static checkOnEvents = false;
  static indexElem: number | null = null;
  public objText: TObjParamsDrawText = {};
  public setObjText = (objText: TObjParamsDrawText) => {
    this.objText = objText;
    this.setFrameRender(Math.random()) // рандомное число для запуска ререндера
  };
  public hoveredIndexRect: number | null = null;
  public setHoveredIndexRect = (index: number | null) => {
    if (this.hoveredIndexRect !== index) {
      this.hoveredIndexRect = index;
      this.setFrameRender(Math.random());
      if (index !== null) console.log('зашли на ' + index)
        else console.log('ушли с элемента')
    }
  };
  public clickIndexRect: number | null = null;
  public setClickIndexRect = (index: number | null) => {
    if (this.clickIndexRect !== index) {
      this.clickIndexRect = index;
      this.setFrameRender(Math.random());
      if (index !== null) console.log('клик по ' + index)
    }
  }

  static rectsForScene: IRectsWriteAndHover[] = [];
  
  handlerMouseMove = (e: MouseEvent) => {
    settingHover(
      CanvasScenes.rectsForScene, e, 
      this.hoveredIndexRect, 
      this.setHoveredIndexRect
    );
  }

  handlerClick = (e: MouseEvent) => {
    CanvasScenes.indexElem = settingHover(
      CanvasScenes.rectsForScene, e,
      this.hoveredIndexRect,
      this.setHoveredIndexRect
    ) ?? null,
    this.setClickIndexRect(CanvasScenes.indexElem)
  }

  handlerKeyDown = (e: KeyboardEvent) => {
    if (CanvasScenes.indexElem !== null) {
      const text = writingsText(
        this.canvasCtx, e, 
        {
          objText: this.objText, 
          set: this.setObjText 
        }, 
        CanvasScenes.rectsForScene[CanvasScenes.indexElem]);
      console.log(text);
      console.log(this.objText);
    }
  }

  public static scenes: TScenes = {
    set: null,
    active: 0
  };
  private setShowModalResult!: Dispatch<SetStateAction<boolean>>
  private setFrameRender!: Dispatch<SetStateAction<number>>

  public canvasRef!: HTMLCanvasElement;
  public canvasCtx!: CanvasRenderingContext2D;
  constructor(
    setScene: Dispatch<SetStateAction<number>>,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setFrameRender: Dispatch<SetStateAction<number>>,
  ) {
    CanvasScenes.scenes.set = setScene;
    this.setShowModalResult = setShowModal;
    this.setFrameRender = setFrameRender;
  }
  
  private static arrCardBack = [
    {left: 32, top: 110, width: 300, height: 197, src: source.cards.back[0]},
    {left: 360, top: 110, width: 300, height: 197, src: source.cards.back[1]},
    {left: 688, top: 110, width: 300, height: 197, src: source.cards.back[0]},
    {left: 200, top: 340, width: 300, height: 197, src: source.cards.back[1]},
    {left: 533, top: 340, width: 300, height: 197, src: source.cards.back[1]},
  ]

  public static cardsForSelect = {
    prof: [0, 1],  // сюда прислать от бека индексы карт профессий и секретов для выбора игроку
    secret: [0, 1]
  }
  // сюда записываются выбранный антураж и данные выбора игрока для блокнота
  public static mainGamer: TMainGamer = {
    antourage: 'england',
    selectedCards: [ // индексы выбранных карт: [выбранная профессия, тайна, невыбранная профессия, тайна]
      0, 0, 1, 1
    ],
    // TODO приходить должно количество игроков.. и в зависимости от этого создавать размеры массивов (1 игрок = 2 местам)
    notes: [ // ответы самого игрока в формате номеров профессий и секретов (их не надо отправлять на сервер, кроме 5 индекса)
    new Array(10),
    new Array(10),
    new Array(10), // инициализировать здесь вначале можно вот так, сейчас пока остальные линии заполнил моками для удобства
    new Array(10),
    new Array(10),
    new Array(10), // здесь на строке с 5 индексом - окончательные ответы игрока - их нужно отправить на сервер для сверки в конце
    new Array(10), // а сюда уже принять в конце от сервера правильно или неправильно угадал игрок
    ]
  }
  public static dataFiveQuestions: TCardQuestion[] = [
    {open: false, type: 'black', index: 0},
    {open: false, type: 'england', index: 1},
    {open: false, type: 'fantasy', index: 2},
    {open: false, type: 'black', index: 5},
    {open: false, type: 'modern', index: 2},
  ]
  private static counterFiveQuestions = {
    openFive: 0,
    open: false
  }
  private static answersOfGamers = {};
  

  static checkanim = 0;
  startGame(
    canvas: HTMLCanvasElement | null,
    scene: number
  ) {
    // console.log('РЕРЕНДЕР КАНВАСА: пуск')
    /* let */const next = false;
    const cs = CanvasScenes;

    if (!canvas) return next;
    if (!this.canvasRef) this.canvasRef = canvas;    
    const ctx = canvas.getContext('2d');
    if (!ctx) return next;
    if (!this.canvasCtx) this.canvasCtx = ctx;

    // подписка на события канваса
    if (!CanvasScenes.checkOnEvents) {
      canvas.addEventListener('click', this.handlerClick)
      canvas.addEventListener('keydown', this.handlerKeyDown)
      canvas.addEventListener('mousemove', this.handlerMouseMove)
      CanvasScenes.checkOnEvents = true;
    }

    canvas.setAttribute('tabIndex', '0');
    canvas.focus();
    
    /* ctx.fillStyle = 'rgba(52, 55, 57, 5%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (CanvasScenes.checkanim <= 100) {
      CanvasScenes.checkanim++
      return true
    }
    else {cs.checkanim = 0} */
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // лого Тест
    drawImgBorderText(ctx, source.logo, {
      left: 950,
      top: 20,
      width: 53,
      height: 43, 
      color: 'black',
      borderPadding: 10,
      // borderColor: 'white',
      // shadowOn: hoveredRect === 0,
      radius: 10
    })
    drawText(ctx, {left: 790, top: 0, width: 100, height: 75, text: 'Testing Draw\nby @odetocoders', fontSize: 25, textColor: 'orange'});
    
    // console.log(`СЦЕНА ${scene}: отрисовка`)
    
    // СЦЕНА ВЫБОРА ПРОФЕССИИ  ------------------------------------------
    if (scene === GAMESCENES.selectProf) {
      
      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.selectProf,
        cback: () => {  
          const arrSelected = cs.mainGamer.selectedCards
          if (this.clickIndexRect !== null) {
            arrSelected[0] = cs.cardsForSelect.prof[this.clickIndexRect];
            arrSelected[2] = cs.cardsForSelect.prof[this.clickIndexRect === 0 ? 1 : 0]
          } else {
            const num = Math.random() < 0.5 ? 0 : 1;
            arrSelected[0] = num;
            arrSelected[2] = num === 1 ? 0 : 1;
          }

          // колбек по окончании сцены (таймера), здесь место для отправки выбора игрока и получения разрешения от сервера продолжать
          const next = true;
          // ...
          if (next) cs.scenes.set?.(GAMESCENES.selectSecret) // можно продолжать? продолжаем
        }
      }
      cs.scenes.active = scene;
      this.sceneSelect(
        'Выберите профессию',
        cs.cardsForSelect.prof,
        source.cards[cs.mainGamer.antourage].profession,
        timerData
      )
    
    // СЦЕНА ВЫБОРА ТАЙНЫ   --------------------------------------------
    } else if (scene === GAMESCENES.selectSecret) {
      
      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.selectSecret,
        cback: () => {
          const arrSelected = cs.mainGamer.selectedCards
          if (this.clickIndexRect !== null) {
            arrSelected[1] = cs.cardsForSelect.prof[this.clickIndexRect];
            arrSelected[3] = cs.cardsForSelect.prof[this.clickIndexRect === 0 ? 1 : 0]
          } else {
            const num = Math.random() < 0.5 ? 0 : 1;
            arrSelected[1] = num;
            arrSelected[3] = num === 1 ? 0 : 1;
          }
          // колбек по окончании сцены (таймера), здесь место для отправки выбора игрока, получения данных выбранных вопросов для следующей сцены и разрешения от сервера продолжать
          const next = true;
          // ...
          if (next) cs.scenes.set?.(GAMESCENES.fiveClose) // можно продолжать? продолжаем
        }
      }      
      cs.scenes.active = scene;
      this.sceneSelect(
        'Выберите тайну',
        cs.cardsForSelect.secret,
        source.cards[cs.mainGamer.antourage].secrets,
        timerData
      )

    // ПРОМЕЖУТОЧНАЯ СЦЕНА ПЯТИ ВОПРОСОВ (колбеки здесь не нужны) (запускается 10 раз за игру - каждый вопрос закрыт/открыт)  --------------------
    } else if (scene === GAMESCENES.fiveClose || scene === GAMESCENES.fiveOpen) {
      
      const counter = cs.counterFiveQuestions;

      this.sceneFiveQuestions(cs.dataFiveQuestions);

      if (cs.scenes.active !== scene) {
        cs.scenes.active = scene;
        if (counter.open) {
          counter.openFive++
        };
        counter.open = !counter.open
        setTimeout(() => { // здесь хватает обычного таймаута
          if (cs.dataFiveQuestions[counter.openFive]) {
            cs.dataFiveQuestions[counter.openFive].open = counter.open;
          }
          cs.scenes.set?.(scene === GAMESCENES.fiveClose ? GAMESCENES.fiveOpen : GAMESCENES.myAnswer)
        }, scene === GAMESCENES.fiveClose 
          ? TIMESCENES.fiveClose * 1000
          : TIMESCENES.fiveOpen * 1000
        )
      }

    // СЦЕНА ОТВЕТА НА КАЖДЫЙ ОТДЕЛЬНЫЙ ВОПРОС ИЗ ПЯТИ (запускается пять раз за игру) ------------------
    } else if (scene === GAMESCENES.myAnswer) {

      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.myAnswer,
        cback: () => {
          // колбек по окончании сцены, здесь место для отправки ответа игрока и получения ответов игроков с сервера и разрешения продолжать
          const mockAnswersOfGamers = {
            Gamer12345: 'Живу в лесу, люблю есть мухоморы, иногда встречаю лакомые поганки, иногда приходится быть на диете и пить одну только воду',
            Gamer2: 'Ношу, ношу, уже устал, ох, как же так, и нет ни конца, ни начала этим письмам',
            Gamer3: 'Встретил я однажды золотую монетку, с тех пор с золотом не расстаюсь, люблю его как самого себя',
            Gamer4: 'Я Завулон, Маг и Великий Воин в одном лице, Вы никогда не догадаетесь, откуда я пришел и куда иду',
            Gamer5: 'Вы думаете, у меня не бывает неудач? Еще как'
          }
          cs.answersOfGamers = mockAnswersOfGamers;
          const next = true;
          // ...
          if (next) cs.scenes.set?.(GAMESCENES.gamersAnswers) // можно продолжать, все получили? продолжаем
        }
      }
      this.sceneWriteAnswer(NAMESCENES.myAnswer, timerData);

    // СЦЕНА ОБДУМЫВАНИЯ ОТВЕТОВ ИГРОКОВ НА ВОПРОС И ЗАПОЛНЕНИЯ БЛОКНОТА (запускается пять раз за игру) -----------------      
    } else if (scene === GAMESCENES.gamersAnswers) {

      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.gamersAnswers,
        cback: () => {
          // колбек по окончании сцены, здесь место для отправки ответа игрока и получение разрешения продолжать          
          const next = true;
          // ...
          
          if (next) { // можно продолжать? все получили? продолжаем
            if (cs.counterFiveQuestions.openFive < 5) {
              // очистка таймеров для нового круга вопросов
              delete cs.timers[GAMESCENES.myAnswer];
              delete cs.timers[GAMESCENES.gamersAnswers];
              this.clickIndexRect = null; // принудительная очистка лога клика
              
              cs.scenes.set?.(GAMESCENES.fiveClose)
            } else {
              this.clickIndexRect = null; // --|--

              cs.scenes.set?.(GAMESCENES.finalAnswer)
            }
          }
        }
      }
      this.sceneAnswersAndThink(NAMESCENES.gamersAnswers, timerData)

    // ФИНАЛЬНАЯ СЦЕНА ОБДУМЫВАНИЯ И ОКОНЧАТЕЛЬНОГО ОТВЕТА -----------------      
    } else if (scene === GAMESCENES.finalAnswer || scene === GAMESCENES.finalResult) {
      
      const timerData = {
        nameId: scene,
        seconds: scene === GAMESCENES.finalAnswer 
          ? TIMESCENES.finalAnswer
          : TIMESCENES.finalResult,
        cback: () => {
          if (scene === GAMESCENES.finalAnswer) {// колбек по окончании сцены, здесь место для отправки итогового ответа игрока и получение итоговых результатов и true для продолжения       
            const result = [true, false, false, true, true, false, false, false, true, true]
            result.forEach((check, index) => {
              cs.mainGamer.notes[6][index] = check ? '✔' : '✖'
            })
            const next = true;
            // ...
            if (next) { // можно продолжать? все получили? продолжаем переход
              cs.scenes.set?.(GAMESCENES.finalResult)
            }
          } else { // иначе это финальный экран с результатами, поэтому подчищаем игру за собой и делаем перерендер компонента с модальным окном с результатами
            // cs.timers = {};
            cs.counterFiveQuestions.openFive = 0;
            cs.counterFiveQuestions.open = false;
            cs.dataFiveQuestions.forEach(card => {
              card.open = false;
            })
            
            //
            alert('ПОКАЗЫВАЕМ МОДАЛЬНОЕ ОКНО РЕЗУЛЬТАТОВ')
            this.setShowModalResult(true)
          }
        }
      }
      const nameScene = scene === GAMESCENES.finalAnswer
        ? NAMESCENES.finalAnswer
        : NAMESCENES.finalResult
      this.sceneFinalThink(nameScene, timerData)
    }

    return next;
  }

  sceneSelect(
    text: string,
    indexForSelect: number[],
    profOrSecrets: string[],
    timerData: TTimerData
  ) {
    const ctx = this.canvasCtx;
    CanvasScenes.rectsForScene = hoverRects[NAMESCENES.select];

    // запускаем таймер
    this.helperDrawTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds,
      left: 487,
      top: 304,
      width: 70,
      height: 35,
      fontSize: 32,
      textColor: 'white',
      cback: timerData.cback
    })
    
    drawText(ctx, {
      left: 450, top: 28, width: 124, height: 32, 
      text: text, 
      fontSize: 25, 
      textColor: 'white'});

    drawImgBorderText(ctx, profOrSecrets[indexForSelect[0]], {
      left: 90,
      top: 85,
      width: 347,
      height: 526,
      color: 'black',
      borderPadding: 5,
      borderColor: 'orange',
      shadowOn: 
        this.hoveredIndexRect === 0
        || this.clickIndexRect === 0,
      radius: 5
    })

    drawImgBorderText(ctx, profOrSecrets[indexForSelect[1]], {
      left: 577,
      top: 85,
      width: 347,
      height: 526,
      color: 'black',
      borderPadding: 5,
      borderColor: 'orange',
      shadowOn:
        this.hoveredIndexRect === 1
        || this.clickIndexRect === 1,
      radius: 5
    })


  }

  sceneFiveQuestions(
    arrQuestions: TCardQuestion[]
  ){
    const ctx = this.canvasCtx;

    CanvasScenes.arrCardBack.forEach((elem, index) => {
      drawImgBorderText(
        ctx, 
        arrQuestions[index].open
          ? source[`q${arrQuestions[index].type}`] 
          : elem.src, 
        {
        left: elem.left,
        top: elem.top,
        width: elem.width,
        height: elem.height,
        color: 'black',
        borderPadding: 1,
        borderColor: this.helperBorderColor(arrQuestions[index].type),
        // shadowOn: hoveredRect === 0,
        radius: 5
        }, {
        text: arrQuestions[index].open ? questions[ arrQuestions[index].type ][ arrQuestions[index].index ] : ''
      })
    })    
  }

  sceneWriteAnswer(
    nameScene: string,
    timerData: TTimerData
  ){
    const ctx = this.canvasCtx
    const cs = CanvasScenes;
    const cardQuestion = cs.dataFiveQuestions[cs.counterFiveQuestions.openFive - 1];

    this.helperDrawTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds,
      left: 477,
      top: 474,
      width: 70,
      height: 30,
      fontSize: 25,
      textColor: 'white',
      cback: timerData.cback
    })

    drawImgBorderText(ctx, source[`q${cardQuestion.type}`], {
      left: 222,
      top: 85,
      width: 580,
      height: 362,
      color: 'black',
      borderPadding: 20,
      borderColor: this.helperBorderColor(cardQuestion.type),
      radius: 30
    },{
      text: questions[ cardQuestion.type ][ cardQuestion.index ]
    })

    const numAnswer = cs.counterFiveQuestions.openFive-1;
    
    if (hoverRects[`${nameScene}${numAnswer}`] === undefined) {
      const {
        left, top, width, height
      } = hoverRects[NAMESCENES.myAnswer][0];
      
      hoverRects[`${nameScene}${numAnswer}`] = [{
        key: `${nameScene}${numAnswer}`,
        left: left,
        top: top,
        width: width,
        height: height,
        fontSize: 35 // этот размер шрифта не используется, но влияет на расчет количества строк и символов в строке
      }]
    }
    
    cs.rectsForScene = hoverRects[`${nameScene}${numAnswer}`];

    drawRoundedRect(
      ctx, {
        ...cs.rectsForScene[0],
        radius: 10,
        color: '#242729',
        borderColor: this.helperBorderColor(cardQuestion.type)
      }, 
      this.hoveredIndexRect === 0
    );
    if (this.clickIndexRect === 0) {
      drawRoundedRect(
        ctx, {
          ...cs.rectsForScene[0],
          radius: 10,
          color: 'rgba(0, 255, 0, 0.05)'
        }
      );
    }
    if (this.objText[`${nameScene}${numAnswer}`]) {
      drawText(
        ctx, {
          ...this.objText[`${nameScene}${numAnswer}`], 
          fontSize: 30
        }
      );
    }
  }
  
  private static arrPlaceUsersAnswer = {
    topName: 70, topOffset: 110,
    left: 52, top: 100, width: 370, height: 72
  }
  private static objCoordsNotes = {
    topName: 430,
    left: 473, top: 475, width: 50.4, height: 19.5
  }

  sceneAnswersAndThink(
    nameScene: string,
    timerData: TTimerData
  ){
    const ctx = this.canvasCtx;
    const cs = CanvasScenes;
    const userCoords = cs.arrPlaceUsersAnswer; 
    // в usersAndAnswer сюда c предыдущей сцены должен прийти ответ с объектом в формате {имя Соперника: егоОтвет}
    const usersAndAnswer: {[key in string]: string} = cs.answersOfGamers;
    const myAnswers = cs.mainGamer.notes;
    const type = cs.mainGamer.antourage;

    // запускаем таймер
    this.helperDrawTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds,
      left: 487,
      top: 45,
      width: 85,
      height: 35,
      fontSize: 25,
      textColor: 'white',
      cback: timerData.cback
    })

    // отрисовка памятки
    drawImgBorderText(ctx, source.memory['england'], {
      left: 460,
      top: 105,
      width: 530,
      height: 265,
      color: 'transparent',
      borderPadding: 5,
      borderColor: this.helperBorderColor(type),
      // shadowOn: hoveredRect === 0,
      radius: 5
    })

    // КОЛБЕК для отрисовки текста поверх блокнота--------------------------------
    const textTopNotebook = () => {
      Object.keys(usersAndAnswer).forEach((nameGamer, index) => {
        // имяИгроков на блокноте
        drawText(ctx, {
          left: cs.objCoordsNotes.left + (2*cs.objCoordsNotes.width*index), 
          top: cs.objCoordsNotes.topName,
          width: 2*cs.objCoordsNotes.width,
          fontSize: 16,
          textColor: 'black',
          text: nameGamer
        })
      })

      // логика наведения и кликов
      // подготовка массива с координатами и размерами полей 'инпутов' (создается один раз на игру)
      if (hoverRects[nameScene][1] === undefined) { // если только первый запуск (есть только элемент [0] с данными для разворачивания)
        const {
          left, top, width, height
        } = hoverRects[nameScene][0] // достаем начальные данные
        hoverRects[nameScene] = []; // подготавливаем его (очищаем)
        const lengthLine = cs.mainGamer.notes[0].length
        for (let indexLine = 0; indexLine < 6; indexLine++) { // разворачиваем данные (запушиваем массив 'инпутов')
          for (let i = 0; i < lengthLine; i++) {
            hoverRects[nameScene].push({
              key: `notebook${i + indexLine*lengthLine}`,
              left: left + width*i,
              top: top + height*indexLine,
              width: width,
              height: indexLine === 5 ? height*2 : height,
              validate: /^[1-9]\d?$|Backspace$/ // можно только 2 цифры и удалять
            })
          }
        }
      }
      // можно и без ифа - так как внутри просто передача ссылки на массив (так себе оптимизация)
      if (cs.rectsForScene[0].left !== hoverRects[nameScene][0].left) {
        cs.rectsForScene = hoverRects[nameScene]
      }
      // наведение и клики на 'инпуты' в блокноте
      this.canvasRef.style.cursor = '';
      // если клик
      if (this.clickIndexRect !== null) {
        let {left, top, width, height} = cs.rectsForScene[this.clickIndexRect];
        let radius = 2;
        if (this.clickIndexRect >= cs.rectsForScene.length/6*5) {
          height /= 2,
          left += (width/2 - height/2),
          width = height,
          top += 7,
          radius = 10
        }
        drawRoundedRect(ctx, {
          left: left,
          top: top,
          width: width,
          height: height,
          radius: radius,
          color: 'rgba(146, 252, 12, 0.3)',
          borderColor: 'green'
          }, true
        )
        if (
          this.objText[`notebook${this.clickIndexRect}`]?.text === undefined
          && this.clickIndexRect < cs.rectsForScene.length/6*5
        ) {
          drawText(ctx, {
            left: left,
            top: top,
            width: width,
            height: height,
            text: 'число',
            fontSize: 12,
            textColor: 'rgba(0, 0, 0, 0.4)'
          })
        }
      }
      // если наведение
      if (this.hoveredIndexRect !== null) {
        this.canvasRef.style.cursor = 'text';
        if (this.hoveredIndexRect !== this.clickIndexRect) {
          let {left, top, width, height} = cs.rectsForScene[this.hoveredIndexRect];
          let radius = 2;
          if (this.hoveredIndexRect >= cs.rectsForScene.length/6*5) {
            height /= 2,
            left += (width/2 - height/2),
            width = height,
            top += 7,
            radius = 10
          }
          drawRoundedRect(ctx, {
            left: left,
            top: top,
            width: width,
            height: height,
            radius: radius,
            color: 'rgba(252, 146, 12, 0.2)',
            borderColor: 'black'
            }, true
          )
        }
      }

      // вставка набранного текста в объект
      if (this.clickIndexRect !== null) {
        const obj = this.objText[`notebook${this.clickIndexRect}`];
        const indexLine = Math.floor( this.clickIndexRect / myAnswers[0].length );
        const index = this.clickIndexRect % myAnswers[0].length;
        myAnswers[indexLine][index] = obj?.text
      }

      // ответы игрока на блокноте
      myAnswers.forEach((line, indexLine) => {
        line.forEach((answer, index) => {
          if (!answer) return;
          const odd = index % 2 !== 0 ? true : false;          
          const color = 
            answer === '✔'
            ? 'green'
            : answer === '✖' 
              ? 'red'
              : 'black';
          drawText(ctx, {
            left: cs.objCoordsNotes.left
              + (cs.objCoordsNotes.width*index)
              + (indexLine === 6
                ? odd
                  ? -13 
                  : 13
                : 0),
            top: cs.objCoordsNotes.top
              + (cs.objCoordsNotes.height*indexLine)
              + (indexLine === 5 ? 5 : 0) 
              + (indexLine === 6 ? -1 : 0),
            width: cs.objCoordsNotes.width,
            fontSize: 16,
            textColor: color,
            text: answer.toString()
          })
        })
      })
    } //------------------------------------------------------------

    // отрисовка блокнота
    drawImgBorderText(ctx, source.notebookSmall2, {
      left: 460,
      top: 400,
      width: 530,
      height: 205,
      color: 'transparent',
      borderPadding: 5,
      borderColor: this.helperBorderColor(type),
      radius: 5,
      cback: textTopNotebook // колбек для отрисовки текста поверх
    })

    Object.keys(usersAndAnswer).forEach((nameGamer, index) => {
      // область сообщения игроков
      drawRoundedRect(ctx, {
        left: userCoords.left - 20,
        top: userCoords.top + userCoords.topOffset*index,
        width: userCoords.width + 40,
        height: userCoords.height,
        borderColor: this.helperBorderColor(type),
        radius: 10
      })
      // текст сообщения игроков
      drawText(ctx, {
        left: userCoords.left, 
        top: userCoords.top + userCoords.topOffset*index, 
        width: userCoords.width, 
        height: userCoords.height,
        fontSize: 15,
        text: this.transformStrByWidth(
          ctx, 
          usersAndAnswer[nameGamer], 
          userCoords.width,
          15
        )
      })
      // имяИгроков вверху сообщения
      drawText(ctx, {
        left: userCoords.left, 
        top: userCoords.topName + userCoords.topOffset*index,
        // width: user.width,
        height: userCoords.top - userCoords.topName,
        fontSize: 20,
        text: nameGamer
      })
    })
  }

  private static objFinalCoordsNotes = {
    topName: 135,
    left: 48, top: 181, width: 52.8, height: 20.3,
    topProfAndSecrets: 331, offsetProfAndSecrets: 135
  }
  private static objFinalCoordsCards = {
    offset: 144,
    left: 32, top: 410, width: 129, height: 196
  }

  sceneFinalThink(
    nameScene: string,
    timerData: TTimerData
  ){
    const ctx = this.canvasCtx;
    const cs = CanvasScenes;
    // на самом деле из usersAndAnswer в сцене нужны только имена (объект из предыдущих сцен в формате {имя Соперника: егоОтвет})
    const usersAndAnswer: {[key in string]: string} = cs.answersOfGamers;
    const myAnswers = cs.mainGamer.notes;
    const type = cs.mainGamer.antourage;

    // запускаем таймер
    this.helperDrawTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds, // нужное количество секунд
      left: 487,
      top: 45,
      width: 70,
      height: 35,
      fontSize: 25,
      textColor: 'white',
      cback: timerData.cback
    })
    
    // КОЛБЕК для отрисовки текста поверх блокнота -------------------------------------
    const textTopNotebook = () => {
      Object.keys(usersAndAnswer).forEach((nameGamer, index) => {      
        // имяИгроков на блокноте
        drawText(ctx, {
          left: cs.objFinalCoordsNotes.left + (2*cs.objFinalCoordsNotes.width*index), 
          top: cs.objFinalCoordsNotes.topName,
          width: 2*cs.objFinalCoordsNotes.width,
          fontSize: 16,
          textColor: 'black',
          text: nameGamer
        })
      })      
      
      this.canvasRef.style.cursor = '';
      if (nameScene === NAMESCENES.finalAnswer) {
        // логика наведения и кликов
        // подготовка массива с координатами и размерами полей 'инпутов' (создается один раз на игру)
        if (hoverRects[nameScene][1] === undefined) { // если только первый запуск (есть только элемент [0] с данными для разворачивания)
          const {
            left, top, width, height
          } = hoverRects[nameScene][0] // достаем начальные данные
          hoverRects[nameScene] = []; // подготавливаем его (очищаем)
          const lengthLine = cs.mainGamer.notes[0].length
          for (let indexLine = 0; indexLine < 6; indexLine++) { // разворачиваем данные (запушиваем массив 'инпутов')
            for (let i = 0; i < lengthLine; i++) {
              hoverRects[nameScene].push({
                key: `notebook${i + indexLine*lengthLine}`,
                left: left + width*i,
                top: top + height*indexLine,
                width: width,
                height: indexLine === 5 ? height*2 : height,
                validate: /^[1-9]\d?$|Backspace$/ // можно только 2 цифры и удалять
              })
            }
          }
        }
        // можно и без ифа - так как внутри просто передача ссылки на массив (так себе оптимизация)
        if (!cs.rectsForScene[0] || cs.rectsForScene[0].left !== hoverRects[nameScene][0].left) {
          cs.rectsForScene = hoverRects[nameScene]
        }
        // наведение и клики на 'инпуты' в блокноте
        // если клик
        if (this.clickIndexRect !== null) {
          let {left, top, width, height} = cs.rectsForScene[this.clickIndexRect];
          let radius = 2;
          if (this.clickIndexRect >= cs.rectsForScene.length/6*5) {
            height /= 2,
            left += (width/2 - height/2),
            width = height,
            top += 7,
            radius = 10
          }
          drawRoundedRect(ctx, {
            left: left,
            top: top,
            width: width,
            height: height,
            radius: radius,
            color: 'rgba(146, 252, 12, 0.3)',
            borderColor: 'green'
            }, true
          )
          if (
            this.objText[`notebook${this.clickIndexRect}`]?.text === undefined
            && this.clickIndexRect < cs.rectsForScene.length/6*5
          ) {
            drawText(ctx, {
              left: left,
              top: top,
              width: width,
              height: height,
              text: 'число',
              fontSize: 12,
              textColor: 'rgba(0, 0, 0, 0.4)'
            })
          }
        }
        // если наведение
        if (this.hoveredIndexRect !== null) {
          this.canvasRef.style.cursor = 'text';
          if (this.hoveredIndexRect !== this.clickIndexRect) {
            let {left, top, width, height} = cs.rectsForScene[this.hoveredIndexRect];
            let radius = 2;
            if (this.hoveredIndexRect >= cs.rectsForScene.length/6*5) {
              height /= 2,
              left += (width/2 - height/2),
              width = height,
              top += 7,
              radius = 10
            }
            drawRoundedRect(ctx, {
              left: left,
              top: top,
              width: width,
              height: height,
              radius: radius,
              color: 'rgba(252, 146, 12, 0.2)',
              borderColor: 'black'
              }, true
            )
          }
        }
        // вставка набранного текста в объект
        if (this.clickIndexRect !== null) {
          const obj = this.objText[`notebook${this.clickIndexRect}`];
          const indexLine = Math.floor( this.clickIndexRect / myAnswers[0].length );
          const index = this.clickIndexRect % myAnswers[0].length;
          myAnswers[indexLine][index] = obj?.text
        }
      } else {
        cs.rectsForScene = [];
      }

      // ответы игрока на блокноте
      myAnswers.forEach((line, indexLine) => {
        line.forEach((answer, index) => {
          if (!answer) return;
          const odd = index % 2 !== 0 ? true : false;          
          const color = 
            answer === '✔'
            ? 'green'
            : answer === '✖' 
              ? 'red'
              : 'black';
          drawText(ctx, {
            left: cs.objFinalCoordsNotes.left 
              + (cs.objFinalCoordsNotes.width*index) 
              + (indexLine === 6
                ? odd
                  ? -13 
                  : 13
                : 0),
            top: cs.objFinalCoordsNotes.top
              + (cs.objFinalCoordsNotes.height*indexLine)
              + (indexLine === 5 ? 4 : 0)
              + (indexLine === 6 ? -3 : 0),
            width: cs.objFinalCoordsNotes.width,
            fontSize: 16,
            textColor: color,
            text: answer.toString()
          })
        })
      })
      // выбранные и исключенные профессии и секреты игрока на блокноте
      cs.mainGamer.selectedCards.forEach((card, index) => {
        const typeCards = index % 2 === 0 ? 'profession' : 'secrets';
        const color = index < 2 ? 'green' : 'red';
        drawText(ctx, {
          left: cs.objFinalCoordsNotes.left + cs.objFinalCoordsNotes.offsetProfAndSecrets*index,
          top: cs.objFinalCoordsNotes.topProfAndSecrets,
          width: 124,
          height: 50,
          fontSize: 15,
          textColor: color,
          text: cards[type][typeCards][card]
        })
      })
    } // -----------------------------------------------------------------------

    drawImgBorderText(ctx, source.notebookSmall, {
      left: 34,
      top: 105,
      width: 556,
      height: 293,
      color: 'transparent',
      borderPadding: 4,
      borderColor: this.helperBorderColor(type),
      radius: 5,
      cback: textTopNotebook // отдаем сюда колбек для отрисовки поверх блокнота
    })

    drawImgBorderText(ctx, source.memory[`${type}H`], {
      left: 610,
      top: 105,
      width: 380,
      height: 500,
      color: 'transparent',
      borderPadding: 5,
      borderColor: this.helperBorderColor(type),
      radius: 5
    })

    // отрисовка карт
    cs.mainGamer.selectedCards.forEach((card, index) => {
      const typeCards = index % 2 === 0 ? 'profession' : 'secrets';
      const color = index < 2 ? 'green' : 'red';
      drawImgBorderText(ctx, source.cards[type][typeCards][card], {
        left: cs.objFinalCoordsCards.left + cs.objFinalCoordsCards.offset*index,
        top: cs.objFinalCoordsCards.top,
        width: cs.objFinalCoordsCards.width,
        height: cs.objFinalCoordsCards.height,
        color: color,
        borderPadding: 4,
        radius: 5
      })
    })
  }

  helperBorderColor(what: string){
    const color = what === 'black' ? 'white'
      : what === 'fantasy' ? 'yellow'
      : what === 'modern' ? 'grey'
      : 'orange';
    return color;
  }

  public static timers: {
    [key in string]: {
      timer: NodeJS.Timer | null, 
      counter: number, 
      checkEnd: boolean,
      checkCback: boolean
    }
  } = {};

  helperDrawTimer(ctx: CanvasRenderingContext2D, props: {
    nameTimer: string | number,
    numsSeconds: number,
    left: number, 
    top: number, 
    width: number, 
    height: number,
    fontSize?: number, 
    textColor?: string,
    countFloatNumbers?: 0 | 1 | 2,
    cback?: () => void,
  }) {
    const {nameTimer, numsSeconds, left, top, width, height, cback} = props;
    const fontSize = props.fontSize ?? 20;
    const textColor = props.textColor ?? 'white';
    const fnums = props.countFloatNumbers ?? 0;
    const decr = 1 / (10 ** fnums);
    const fps = 1000 / (10 ** fnums);

    if (!CanvasScenes.timers[nameTimer]) {
      CanvasScenes.timers[nameTimer] = {
        timer: null, // сам таймер, пока инициализируем в null
        counter: numsSeconds,  // число секунд таймера
        checkEnd: false, // проверка конца таймера
        checkCback: false // проверка единственного вызова колбека
      };
      console.log(`инициализирован таймер ${nameTimer}`, CanvasScenes.timers)
    }


    const timerId = CanvasScenes.timers[nameTimer]; // делаем короткую ссылку на таймер

    if (timerId.timer === null && !timerId.checkEnd) { // если таймер не создан и он не закончился, то создаем новый таймер
      timerId.timer = setInterval(() => {
        ctx.fillStyle = 'black'; // TODO сделать возможность прямоугольников с таймером
        ctx.clearRect(left, top, width, height);
        timerId.counter-=decr;
        drawText(ctx, {
          left: left + 4, 
          top: top + fontSize, 
          text: `${timerId.counter <= 0
              ? Math.round(timerId.counter / 60)
              : Math.floor(timerId.counter / 60)
            }:${(timerId.counter % 60).toFixed(fnums)}`,
          fontSize: fontSize,

          textColor: textColor
        })
        if (timerId.counter <= 0) {
          if (timerId.timer !== null) {
            clearInterval(timerId.timer);
          }
          timerId.checkEnd = true;
          //delete CanvasScenes.timers[nameTimer]
        }
        if (timerId.counter <= 0 && cback && !timerId.checkCback) {
          cback();
          timerId.checkCback = true;
        }
        // console.log(timerId.counter)
      }, fps);
    } else {
      ctx.fillStyle = 'black';
      ctx.clearRect(left, top, width, height)
      drawText(ctx, {
        left: left + 4, 
        top: top + fontSize,
        text: `${
          timerId.counter <= 0
            ? '0'
            : Math.floor(timerId.counter / 60)
          }:${(timerId.counter % 60).toFixed(fnums)}`,
        fontSize: fontSize,
        textColor: textColor
      })  
      if (timerId.counter <= 0 && cback && !timerId.checkCback) {
        cback();
        timerId.checkCback = true;
      } 
    }
  }

  transformStrByWidth(ctx: CanvasRenderingContext2D, str: string, width: number, fontSize?: number) {
    str = str.replace(/[\n\r]/g, '');
    const arrWords = str.split(' ');
    let line = '';
    const lines = [];
    const sizeText = fontSize ?? 20;
    ctx.font = `bold ${sizeText}px Arial Narrow`

    arrWords.forEach(word => {
      const checkLine = `${line}${word} `;
      const checkWidth = ctx.measureText(checkLine).width;

      if (checkWidth > width) {
        lines.push(line.trim());
        line = `${word} `;
      } else {
        line = checkLine;
      }
    })

    if (line.trim()) {
      lines.push(line.trim());
    }

    return lines.join('\n');
  }
}
