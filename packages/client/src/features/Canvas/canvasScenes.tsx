import { Dispatch, SetStateAction } from 'react';
import { ssd } from './storeSessionData';

import gameData from '../../mocks/gameData.json';

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

import { TMainGamer, TScenes, TObjParamsDrawText, TCardQuestion, TAnswers } from './types';
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
  static gameId: number;

  public scenes: TScenes;
  public audio: SoundPlayer;
  public checkOnSounds = false;
  private handlerEvents: HandlerEvents;
  private setShowModalResult!: Dispatch<SetStateAction<boolean>>
  private setFrameRender!: Dispatch<SetStateAction<number>>

  public canvasRef!: HTMLCanvasElement;
  public canvasCtx!: CanvasRenderingContext2D;
  public handleChoose: (type: string, vote: any, key: string) => void;
  public handleShowAnswer: () => void;
  public handleCheckAnswers: () => void;

  constructor(
    setScene: Dispatch<SetStateAction<number>>,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setFrameRender: Dispatch<SetStateAction<number>>,
    ratio: {width: number, height: number},
    handleChoose: (type: string, vote: string | number | null, key: string) => void,
    handleShowAnswer: () => void,
    handleCheckAnswers: () => void,
  ) {
    this.setShowModalResult = setShowModal;
    this.setFrameRender = setFrameRender;
    this.handleChoose = handleChoose;
    this.handleShowAnswer = handleShowAnswer;
    this.handleCheckAnswers = handleCheckAnswers;

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
      this.scenes.set?.(GAMESCENES.selectWishEntourage);
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
            entourage = this.returnEntourage(this.clickIndexRect);
          } else {
            entourage = this.returnEntourage(this.randomIndex012())
          }

          this.handleChoose('winEntourage', entourage, 'entourage');

          this.indexElem = null;
          this.clickIndexRect = null;
          this.hoveredIndexRect = null;
          ssd.rectsForScene = [];
          this.canvasRef.style.cursor = '';
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

          let num;
            
          const arrSelected = ssd.mainGamer.selectedCards;

          if (this.clickIndexRect !== null) {
            arrSelected[0] = ssd.cardsForSelect.prof[this.clickIndexRect];
            arrSelected[2] = ssd.cardsForSelect.prof[this.clickIndexRect === 0 ? 1 : 0];

            num = ssd.cardsForSelect.prof[this.clickIndexRect];

          } else {
            num = Math.random() < 0.5 ? 0 : 1;
            arrSelected[0] = ssd.cardsForSelect.prof[num];
            arrSelected[2] = ssd.cardsForSelect.prof[num === 1 ? 0 : 1];
          }

          this.handleChoose('game', gameData[0][ssd.mainGamer.entourage].profession[num], 'profession');

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
          const arrSelected = ssd.mainGamer.selectedCards;

          let num;
          if (this.clickIndexRect !== null) {
            num = ssd.cardsForSelect.prof[this.clickIndexRect];
            arrSelected[1] = ssd.cardsForSelect.secret[this.clickIndexRect];
            arrSelected[3] = ssd.cardsForSelect.secret[this.clickIndexRect === 0 ? 1 : 0]
          } else {
            num = Math.random() < 0.5 ? 0 : 1;
            arrSelected[1] = ssd.cardsForSelect.secret[num];
            arrSelected[3] = ssd.cardsForSelect.secret[num === 1 ? 0 : 1];
          }

          this.handleChoose('game', gameData[0][ssd.mainGamer.entourage].secret[num], 'secret');

          // колбек по окончании сцены (таймера), здесь место для отправки выбора игрока, получения данных выбранных вопросов для следующей сцены и разрешения от сервера продолжать
          const next = true;

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
          this.indexElem = 0;
          this.clickIndexRect = 0;
          this.hoveredIndexRect = null;
          const text = ssd.objText[`${NAMESCENES.myAnswer}${ssd.counterFiveQuestions.openFive-1}`]?.text ?
            ssd.objText[`${NAMESCENES.myAnswer}${ssd.counterFiveQuestions.openFive-1}`]?.text
            : 'нет ответа';

          ssd.answersOfGamers = {};
          new Promise((res) => {
            res(this.handleChoose(
              'game',
              text,
              'answers'))
          }).then(() => {
            this.handleShowAnswer();
          })
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
          this.handleChoose('game', ssd.mainGamer.notes, 'votes');
          // колбек по окончании сцены,
          const next = true;
          
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
            new Promise((res) => {
              res(this.handleChoose('game', ssd.mainGamer.notes[5], 'finalVotes'))
            }).then(() => this.handleCheckAnswers());
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
