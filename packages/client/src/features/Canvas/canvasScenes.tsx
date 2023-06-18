import { Dispatch, SetStateAction } from 'react';
import { ssd } from './storeSessionData';

import {
  SelectWishEntourage,
  WinEntourage,
  SelectCard,
  FiveQuestions,
  WriteAnswer,
  AnswersAndThink,
  FinalThink
} from './scenes';
import {
  drawImgBorderText,
  loadImagesInCache,
  firstDownloader,
  helperBorderColor,
  drawAndStartTimer
} from './utils';
import { source } from '../../shared/const/gameLibrary/dataLibrary';
import { GAMESCENES, NAMESCENES, TIMESCENES } from './const';

import { TMainGamer, TScenes, TObjParamsDrawText, TCardQuestion } from './types';
import { HandlerEvents } from './utils/handlerEvents';
import { SoundPlayer } from './soundPlayer';

/**
 * множитель под динамический размер канваса
 */
let m: number;
/**
 * левый сдвиг под динамический размер канваса
 */
let lofs: number;


export class CanvasScenes {

  public scenes: TScenes;
  public audio: SoundPlayer;
  public checkOnSounds = false;
  private handlerEvents: HandlerEvents;
  private setShowModalResult!: Dispatch<SetStateAction<boolean>>
  private setFrameRender!: Dispatch<SetStateAction<number>>

  public canvasRef!: HTMLCanvasElement;
  public canvasCtx!: CanvasRenderingContext2D;

  constructor(
    setScene: Dispatch<SetStateAction<number>>,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setFrameRender: Dispatch<SetStateAction<number>>,
    ratio: {width: number, height: number}
  ) {
    this.setShowModalResult = setShowModal;
    this.setFrameRender = setFrameRender;

    ssd.reset();
    m = ssd.ratio.multiple = ratio.height/640;
    lofs = ssd.ratio.leftOffset = (ratio.width-1024*m)/2;
    if (!ssd.ratio.checkSuccessCalc) {
      // важный объект ssd.hoverRects сразу пересчитываем под динамический канвас
      // поэтому в сценах уже пересчитывать не нужно
      for (const key in ssd.hoverRects) {
        for (let i = 0; i < ssd.hoverRects[key].length; i++) {
          ssd.hoverRects[key][i].left = (ssd.hoverRects[key][i].left *m) + lofs;
          ssd.hoverRects[key][i].top *= m;
          ssd.hoverRects[key][i].width *= m;
          ssd.hoverRects[key][i].height *= m;
        }
      }
      ssd.ratio.checkSuccessCalc = true;
    }
    this.scenes = {
      set: setScene,
      active: 0,    
      selectWishEntourage: new SelectWishEntourage(this),
      winEntourage: new WinEntourage(this),
      selectCard: new SelectCard(this),
      fiveQuestions: new FiveQuestions(this),
      writeAnswer: new WriteAnswer(this),
      answersAndThink: new AnswersAndThink(this),
      finalThink: new FinalThink(this)
    }
    this.handlerEvents = new HandlerEvents(this);
    this.audio = new SoundPlayer();
    this.audio.stopAll();
  }

  startGame(
    canvas: HTMLCanvasElement | null,
    scene: number
  ) {
    /* let */const next = false;

    if (!canvas) return next;
    if (!this.canvasRef) this.canvasRef = canvas;    
    const ctx = canvas.getContext('2d');
    if (!ctx) return next;
    if (!this.canvasCtx) this.canvasCtx = ctx;

    // подписка на события канваса
    if (!this.checkOnEvents) {
      this.handlerEvents.addEventsListener();
      this.checkOnEvents = true;
    }

    canvas.setAttribute('tabIndex', '0');
    canvas.focus();

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // предзагрузка в кеш изображений и звуков
    if (!ssd.checkLoaded) {
      ssd.checkLoaded = true;
      loadImagesInCache(source.game);
      this.audio.loadSoundsInCache(source.sounds);
    }
    // загрузчик перед игрой
    if ((ssd.arrLoadedImgSrc.length + ssd.audioStore.size) < 106) {
      firstDownloader(ctx, canvas, 103 + 3);
      setTimeout(() => this.setFrameRender(Math.random()), 100);
      return false;     
    }
    if (!this.checkOnSounds) {
      this.audio.play(source.sounds.bgMain, true);
      this.checkOnSounds = true;
    }
    
    this.drawBackground(scene);

    if (scene === GAMESCENES.selectWishEntourage) {
    // СЦЕНА ВЫБОРА ЖЕЛАЕМОГО АНТУРАЖА  ------------------------------------------

      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.selectWishEntourage,
        cback: () => {
          // колбек по окончании сцены (таймера)
          let entourage: TMainGamer['entourage'];
          // запись желаемого антуража в временный entourage
          if (this.clickIndexRect !== null) {
            entourage = this.returnEntourage(this.clickIndexRect)
          } else {
            entourage = this.returnEntourage(this.randomIndex012())
          }

          // WEBSOCKET место для отправки entourage на бек

          // с бека получаем выигравший антураж и количество голосов за него
          const mockResWinEntourage = entourage // пока закинем желаемый как мок
          const mockRecNumsVoicesWinEntourage = 4;
          // получаем также количество [1-5] соперников в сессии игры для целей отрисовки и их имена
          const mockResNumsRivals = 5;
          const mockResNamesRivals = ['Bibi', 'Macarena', 'MoveIt', 'Wolf', 'Sherlock'];
          // здесь (или позже?) получаем также 5 вопросов для сцен в формате {тип вопроса, индекс}[]
          // по типу и индексу в нужных сценах достаются строки-вопросы из библиотеки questions ('../../shared/const/gameLibrary/dataLibrary')
          const mockFiveAnswers: TCardQuestion[] = [
            {type: 'black', index: 0},
            {type: 'england', index: 1},
            {type: 'modern', index: 2},
            {type: 'black', index: 5},
            {type: 'fantasy', index: 2},
          ]

          ssd.mainGamer.entourage = mockResWinEntourage;
          switch (ssd.mainGamer.entourage) {
            case 'england':
              ssd.mainGamer.nameEntourage = 'Викторианская Англия'
              break;
            case 'modern':
              ssd.mainGamer.nameEntourage = 'Современность'
              break;
            case 'fantasy':
              ssd.mainGamer.nameEntourage = 'Фэнтези'
              break;
            default:              
              break;
          }
          ssd.mainGamer.numsVoicesWinEntourage = mockRecNumsVoicesWinEntourage;
          ssd.mainGamer.numsRivals = mockResNumsRivals;
          ssd.mainGamer.namesRivals = mockResNamesRivals;
          mockFiveAnswers.forEach((answer, index) => {
            ssd.dataFiveQuestions[index] = {open: false, ...answer}
          })
          ssd.dataFiveQuestions
          for (let i = 0; i < 8; i++) { // разворачиваем 8 массивчиков для отрисовки и возможности заполнять блокнот в след сценах
            ssd.mainGamer.notes.push(new Array(ssd.mainGamer.numsRivals*2))
          }

          const next = true; // можно продолжать
          // ...
          this.indexElem = null;
          this.clickIndexRect = null;
          this.hoveredIndexRect = null;
          ssd.rectsForScene = [];
          this.canvasRef.style.cursor = '';
          if (next) this.scenes.set?.(GAMESCENES.winEntourage) // ок, продолжаем
        }
      }
      this.scenes.active = scene;
      this.scenes.selectWishEntourage.render(
        'Голосование за антураж',
        timerData
      )
    
    } else if (scene === GAMESCENES.winEntourage) {
    // ПРОМЕЖУТОЧНАЯ СЦЕНА ПОКАЗА ВЫИГРАВШЕГО АНТУРАЖА  -------------------------

      this.scenes.active = scene;
      this.scenes.winEntourage.render();

      setTimeout(() => { // здесь хватает обычного таймаута
        this.scenes.set?.(GAMESCENES.selectProf)
      }, TIMESCENES.winEntourage * 1000
      )
    
    } else if (scene === GAMESCENES.selectProf) {
    // СЦЕНА ВЫБОРА ПРОФЕССИИ  ------------------------------------------
      
      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.selectProf,
        cback: () => {  
            
          const arrSelected = ssd.mainGamer.selectedCards
          if (this.clickIndexRect !== null) {
            // const num = ssd.cardsForSelect.prof[this.clickIndexRect];
            // console.log(mock[0]['england'].profession[num]);
            arrSelected[0] = ssd.cardsForSelect.prof[this.clickIndexRect];
            arrSelected[2] = ssd.cardsForSelect.prof[this.clickIndexRect === 0 ? 1 : 0]
          } else {
            const num = Math.random() < 0.5 ? 0 : 1;
            arrSelected[0] = ssd.cardsForSelect.prof[num];
            arrSelected[2] = ssd.cardsForSelect.prof[num === 1 ? 0 : 1];
          }

          // колбек по окончании сцены (таймера), здесь место для отправки выбора игрока и получения разрешения от сервера продолжать
          const next = true;
          // ...
          this.indexElem = null;
          this.clickIndexRect = null; // очистка лога клика
          if (next) this.scenes.set?.(GAMESCENES.selectSecret) // можно продолжать? продолжаем
        }
      }
      this.scenes.active = scene;
      this.scenes.selectCard.render(
        'Выберите профессию',
        ssd.cardsForSelect.prof,
        source.game.cards[ssd.mainGamer.entourage].profession,
        timerData
      )
    
    } else if (scene === GAMESCENES.selectSecret) {
    // СЦЕНА ВЫБОРА ТАЙНЫ   --------------------------------------------
      
      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.selectSecret,
        cback: () => {
          const arrSelected = ssd.mainGamer.selectedCards
          if (this.clickIndexRect !== null) {
            // const num = ssd.cardsForSelect.prof[this.clickIndexRect];
            // console.log(mock[0]['england'].profession[num]);
            arrSelected[1] = ssd.cardsForSelect.secret[this.clickIndexRect];
            arrSelected[3] = ssd.cardsForSelect.secret[this.clickIndexRect === 0 ? 1 : 0]
          } else {
            const num = Math.random() < 0.5 ? 0 : 1;
            arrSelected[1] = ssd.cardsForSelect.secret[num];
            arrSelected[3] = ssd.cardsForSelect.secret[num === 1 ? 0 : 1];
          }
          // колбек по окончании сцены (таймера), здесь место для отправки выбора игрока, получения данных выбранных вопросов для следующей сцены и разрешения от сервера продолжать
          const next = true;
          // ...

          this.indexElem = null;
          this.clickIndexRect = null;
          this.hoveredIndexRect = null; // очистка лога наведения
          ssd.rectsForScene = [];
          this.canvasRef.style.cursor = '';
          if (next) this.scenes.set?.(GAMESCENES.fiveClose) // можно продолжать? продолжаем
        }
      }
      this.scenes.active = scene;
      this.scenes.selectCard.render(
        'Выберите тайну',
        ssd.cardsForSelect.secret,
        source.game.cards[ssd.mainGamer.entourage].secrets,
        timerData
      )

    } else if (scene === GAMESCENES.fiveClose || scene === GAMESCENES.fiveOpen) {
    // ПРОМЕЖУТОЧНАЯ СЦЕНА ПЯТИ ВОПРОСОВ (колбеки здесь не нужны) (запускается 10 раз за игру - каждый вопрос закрыт/открыт)  --------------------
      
      const counter = ssd.counterFiveQuestions;

      this.scenes.fiveQuestions.render();

      if (this.scenes.active !== scene) {
        this.scenes.active = scene;
        if (counter.open) {
          counter.openFive++
        };
        counter.open = !counter.open
        drawAndStartTimer(ctx, {
          nameTimer: `${scene}${counter.openFive}`,
          numsSeconds: scene === GAMESCENES.fiveClose 
            ? TIMESCENES.fiveClose
            : TIMESCENES.fiveOpen,
          drawOff: true,
          cback: () => {
            if (ssd.dataFiveQuestions[counter.openFive]) {
              ssd.dataFiveQuestions[counter.openFive].open = counter.open;
            }
            if (scene === GAMESCENES.fiveOpen) {
              this.indexElem = 0,
              this.clickIndexRect = 0,
              this.hoveredIndexRect = 0
            }
            this.scenes.set?.(scene === GAMESCENES.fiveClose ? GAMESCENES.fiveOpen : GAMESCENES.myAnswer)
          }
        })
      }

    } else if (scene === GAMESCENES.myAnswer) {
    // СЦЕНА ОТВЕТА НА КАЖДЫЙ ОТДЕЛЬНЫЙ ВОПРОС ИЗ ПЯТИ (запускается пять раз за игру) ------------------

      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.myAnswer,
        cback: () => {
          console.log(ssd.objText[`${NAMESCENES.myAnswer}${ssd.counterFiveQuestions.openFive-1}`]?.text)
          // колбек по окончании сцены, здесь место для отправки ответа игрока и получения ответов игроков с сервера и разрешения продолжать
          const mockAnswersOfGamers = {
            Bibi: 'Живу в лесу, люблю есть мухоморы, иногда встречаю лакомые поганки, иногда приходится быть на диете и пить одну только воду',
            Macarena: 'Ношу, ношу, уже устал, ох, как же так, и нет ни конца, ни начала этим письмам',
            MoveIt: 'Встретил я однажды золотую монетку, с тех пор с золотом не расстаюсь, люблю его как самого себя',
            Wolf: 'Я Завулон, Маг и Великий Воин в одном лице, Вы никогда не догадаетесь, откуда я пришел и куда иду',
            Sherlock: 'Вы думаете, у меня не бывает неудач? Еще как'
          }
          ssd.answersOfGamers = mockAnswersOfGamers;
          const next = true;
          // ...
          this.indexElem = 0;
          this.clickIndexRect = 0;
          this.hoveredIndexRect = null;
          if (next) this.scenes.set?.(GAMESCENES.gamersAnswers) // можно продолжать, все получили? продолжаем
        }
      }
      this.scenes.active = scene;
      this.scenes.writeAnswer.render(NAMESCENES.myAnswer, timerData);

    } else if (scene === GAMESCENES.gamersAnswers) {
    // СЦЕНА ОБДУМЫВАНИЯ ОТВЕТОВ ИГРОКОВ НА ВОПРОС И ЗАПОЛНЕНИЯ БЛОКНОТА (запускается пять раз за игру) -----------------      

      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.gamersAnswers,
        cback: () => {
          // колбек по окончании сцены,
          const next = true;
          // ...
          
          if (next) { // можно продолжать? все получили? продолжаем
            if (ssd.counterFiveQuestions.openFive < 5) {
              // очистка таймеров для нового круга вопросов
              delete ssd.timers[GAMESCENES.myAnswer];
              delete ssd.timers[GAMESCENES.gamersAnswers];
              this.indexElem = null;
              this.clickIndexRect = null;
              this.hoveredIndexRect = null;
              this.canvasRef.style.cursor = '';
              ssd.rectsForScene = [];
              
              this.scenes.set?.(GAMESCENES.fiveClose)
            } else {
              const index = ssd.mainGamer.numsRivals*2*5
              this.indexElem = index;
              this.clickIndexRect = index;
              this.hoveredIndexRect = null;

              this.scenes.set?.(GAMESCENES.finalAnswer)
            }
          }
        }
      }
      this.scenes.active = scene;
      this.scenes.answersAndThink.render(NAMESCENES.gamersAnswers, timerData)

    } else if (scene === GAMESCENES.finalAnswer || scene === GAMESCENES.finalResult) {
    // ФИНАЛЬНАЯ СЦЕНА ОБДУМЫВАНИЯ И ОКОНЧАТЕЛЬНОГО ОТВЕТА -----------------      
      
      const timerData = {
        nameId: scene,
        seconds: scene === GAMESCENES.finalAnswer 
          ? TIMESCENES.finalAnswer
          : TIMESCENES.finalResult,
        drawOff: scene === GAMESCENES.finalAnswer 
        ? false : false,
        cback: () => {
          if (scene === GAMESCENES.finalAnswer) {// колбек по окончании сцены, здесь место для отправки итогового ответа игрока и получение итоговых результатов и true для продолжения       
            console.log('итоговые массив ответов ', ssd.mainGamer.notes[5])
            const resultMock = [true, false, false, true, true, false, false, false, true, true] // результаты под кругами
            const resultMock2 = [true, true, false, null, null, true, false, true, null, null] // второй ряд результатов (в самом низу) - в моке 3,4,8,9 индексы null, если, например 3 соперника.
            resultMock.forEach((check, index) => {
              ssd.mainGamer.notes[6][index] = check ? '✔' : '✖'
            })
            resultMock2.forEach((check, index) => {
              ssd.mainGamer.notes[7][index] =
                check 
                ? '✔' 
                : check === false
                  ? '✖'
                  : ''
            })
            const next = true;
            // ...
            if (next) { // можно продолжать? все получили? продолжаем переход
              this.scenes.set?.(GAMESCENES.finalResult)
            }
          } else {
            // иначе это финальный экран с результатами, показываем модальное окно с результатами
            this.setShowModalResult(true)
          }
        }
      }
      this.scenes.active = scene;
      const nameScene = scene === GAMESCENES.finalAnswer
        ? NAMESCENES.finalAnswer
        : NAMESCENES.finalResult
      this.scenes.finalThink.render(nameScene, timerData)
    }

    return next;
  }

  public checkOnEvents = false;
  public indexElem: number | null = 0;
  public setObjText = (objText: TObjParamsDrawText) => {
    ssd.objText = objText;
    this.setFrameRender(Math.random()) // рандомное число для запуска ререндера
  };
  public hoveredIndexRect: number | null = null;
  public setHoveredIndexRect = (index: number | null) => {
    if (this.hoveredIndexRect !== index) {
      this.hoveredIndexRect = index;
      this.setFrameRender(Math.random());
    }
  };
  public clickIndexRect: number | null = null;
  public setClickIndexRect = (index: number | null) => {
    if (this.clickIndexRect !== index) {
      this.clickIndexRect = index;
      this.setFrameRender(Math.random());
    }
  }

  returnEntourage = (index: number) => {
    return index === 0
      ? 'modern'
      : index === 1
        ? 'england'
        : 'fantasy'
  }
  
  randomIndex012 = () => {        
    const index = Math.random();
    return index < 1/3 ? 0 : index < 2/3 ? 1 : 2;
  }

  drawBackground = (scene: number) => {    
    if (scene === GAMESCENES.selectWishEntourage) {
      if (this.clickIndexRect !== null) {
        ssd.mainGamer.entourage = this.returnEntourage(this.clickIndexRect)
      }
    }
    drawImgBorderText(this.canvasCtx, source.game.bg[
      scene === GAMESCENES.selectWishEntourage
      && this.clickIndexRect === null
        ? 'base'
        : ssd.mainGamer.entourage
      ], {
      left: 0, top: 0, width: this.canvasRef.width, height: this.canvasRef.height
    })
    if (scene === GAMESCENES.winEntourage) {
      this.canvasRef.style.borderColor = helperBorderColor( ssd.mainGamer.entourage )
    }
  }
}
