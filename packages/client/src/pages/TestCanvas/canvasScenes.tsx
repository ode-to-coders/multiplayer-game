import { Dispatch, SetStateAction } from 'react';
import { ssd } from './storeSessionData';

import { SelectWishEntourage, WinEntourage, SelectCard, FiveQuestions, WriteAnswer, AnswersAndThink, FinalThink } from './scenes';
import { writingsText, drawText, drawImgBorderText, settingHover } from 'shared/utils/canvas';
import { source } from 'shared/const/gameLibrary/dataLibrary';
import { JSCOLORS, GAMESCENES, NAMESCENES, TIMESCENES } from './const';

import { TObjParamsDrawText } from 'shared/utils/canvas/types';
import { TMainGamer, TScenes } from './types';

/**
 * множитель под динамический размер канваса
 */
let m: number;
/**
 * левый сдвиг под динамический размер канваса
 */
let lofs: number;
export class CanvasScenes {

  public scenes: TScenes = {
    set: null,
    active: 0,    
    selectWishEntourage: new SelectWishEntourage(this),
    winEntourage: new WinEntourage(this),
    selectCard: new SelectCard(this),
    fiveQuestions: new FiveQuestions(this),
    writeAnswer: new WriteAnswer(this),
    answersAndThink: new AnswersAndThink(this),
    finalThink: new FinalThink(this)
  };
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

    this.scenes.set = setScene;
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
  }

  public checkanim = 0;
  startGame(
    canvas: HTMLCanvasElement | null,
    scene: number
  ) {
    // console.log('РЕРЕНДЕР КАНВАСА: пуск')
    /* let */const next = false;

    if (!canvas) return next;
    if (!this.canvasRef) this.canvasRef = canvas;    
    const ctx = canvas.getContext('2d');
    if (!ctx) return next;
    if (!this.canvasCtx) this.canvasCtx = ctx;

    // подписка на события канваса
    if (!this.checkOnEvents) {
      canvas.addEventListener('click', this.handlerClick)
      canvas.addEventListener('keydown', this.handlerKeyDown)
      canvas.addEventListener('mousemove', this.handlerMouseMove)
      this.checkOnEvents = true;
    }

    canvas.setAttribute('tabIndex', '0');
    canvas.focus();
    
    /* ctx.fillStyle = 'rgba(52, 55, 57, 5%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (this.checkanim <= 100) {
      this.checkanim++
      return true
    }
    else {cs.checkanim = 0} */
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // лого Тест
    drawImgBorderText(ctx, source.logo, {
      left: canvas.width - 73 *m,
      top: 20 *m,
      width: 53 *m,
      height: 43 *m, 
      color: JSCOLORS.black,
      borderPadding: 10 *m,
      radius: 10 *m,
    })
    drawText(ctx, {left: canvas.width - 230 *m, top: 0, width: 100 *m, height: 75 *m, text: 'Testing Draw\nby @odetocoders', fontSize: 25 *m, textColor: JSCOLORS.orange});
    
    // console.log(`СЦЕНА ${scene}: отрисовка`)
    
    if (scene === GAMESCENES.selectWishEntourage) {
    // СЦЕНА ВЫБОРА ЖЕЛАЕМОГО АНТУРАЖА  ------------------------------------------
      const returnEntourage = (index: number) => {
        return index === 0
          ? 'modern'
          : index === 1
            ? 'england'
            : 'fantasy'
      }
      const randomIndex012 = () => {        
        const index = Math.random();
        return index < 1/3 ? 0 : index < 2/3 ? 1 : 2;
      }

      const timerData = {
        nameId: scene,
        seconds: TIMESCENES.selectWishEntourage,
        cback: () => {
          // колбек по окончании сцены (таймера)
          let entourage: TMainGamer['entourage'];
          // запись желаемого антуража в временный entourage
          if (this.clickIndexRect !== null) {
            entourage = returnEntourage(this.clickIndexRect)
          } else {
            entourage = returnEntourage(randomIndex012())
          }

          // WEBSOCKET место для отправки entourage на бек
          console.log('желаемый антураж ', entourage)

          // с бека получаем выигравший антураж и количество голосов за него
          const mockResWinEntourage = entourage // пока закинем желаемый
          const mockRecNumsVoicesWinEntourage = 4;
          // получаем также количество [1-5] соперников в сессии игры для целей отрисовки и их имена
          const mockResNumsRivals = 5;
          const mockResNamesRivals = ['Bibi', 'Macarena', 'MoveIt', 'Дед', 'Sherlock'];

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
          for (let i = 0; i < 7; i++) { // разворачиваем 7 массивчиков для отрисовки и возможности заполнять блокнот в след сценах
            ssd.mainGamer.notes.push(new Array(ssd.mainGamer.numsRivals*2))
          }

          const next = true; // можно продолжать
          // ...
          this.clickIndexRect = null;
          this.hoveredIndexRect = null;
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
            // console.log(mock[0]['england'].profession[num-1]);
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
          this.clickIndexRect = null; // очистка лога клика
          if (next) this.scenes.set?.(GAMESCENES.selectSecret) // можно продолжать? продолжаем
        }
      }
      this.scenes.active = scene;
      this.scenes.selectCard.render(
        'Выберите профессию',
        ssd.cardsForSelect.prof,
        source.cards[ssd.mainGamer.entourage].profession,
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
            // console.log(mock[0]['england'].profession[num-1]);
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
        source.cards[ssd.mainGamer.entourage].secrets,
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
        setTimeout(() => { // здесь хватает обычного таймаута
          if (ssd.dataFiveQuestions[counter.openFive]) {
            ssd.dataFiveQuestions[counter.openFive].open = counter.open;
          }
          this.scenes.set?.(scene === GAMESCENES.fiveClose ? GAMESCENES.fiveOpen : GAMESCENES.myAnswer)
        }, scene === GAMESCENES.fiveClose 
          ? TIMESCENES.fiveClose * 1000
          : TIMESCENES.fiveOpen * 1000
        )
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
            'Bibi': 'Живу в лесу, люблю есть мухоморы, иногда встречаю лакомые поганки, иногда приходится быть на диете и пить одну только воду',
            'Macarena': 'Ношу, ношу, уже устал, ох, как же так, и нет ни конца, ни начала этим письмам',
            'MoveIt': 'Встретил я однажды золотую монетку, с тех пор с золотом не расстаюсь, люблю его как самого себя',
            'Дед': 'Я Завулон, Маг и Великий Воин в одном лице, Вы никогда не догадаетесь, откуда я пришел и куда иду',
            'Sherlock': 'Вы думаете, у меня не бывает неудач? Еще как'
          }
          ssd.answersOfGamers = mockAnswersOfGamers;
          const next = true;
          // ...
          this.clickIndexRect = null;
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
              this.clickIndexRect = null;
              this.hoveredIndexRect = null;
              this.canvasRef.style.cursor = '';
              ssd.rectsForScene = [];
              
              this.scenes.set?.(GAMESCENES.fiveClose)
            } else {
              this.clickIndexRect = null;
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
        cback: () => {
          if (scene === GAMESCENES.finalAnswer) {// колбек по окончании сцены, здесь место для отправки итогового ответа игрока и получение итоговых результатов и true для продолжения       
            console.log('итоговые массив ответов ', ssd.mainGamer.notes[5])
            const result = [true, false, false, true, true, false, false, false, true, true]
            result.forEach((check, index) => {
              ssd.mainGamer.notes[6][index] = check ? '✔' : '✖'
            })
            const next = true;
            // ...
            if (next) { // можно продолжать? все получили? продолжаем переход
              this.scenes.set?.(GAMESCENES.finalResult)
            }
          } else { // иначе это финальный экран с результатами, поэтому подчищаем игру за собой и делаем перерендер компонента с модальным окном с результатами
            // ssd.timers = {};
            ssd.counterFiveQuestions.openFive = 0;
            ssd.counterFiveQuestions.open = false;
            ssd.dataFiveQuestions.forEach(card => {
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
      this.scenes.finalThink.render(nameScene, timerData)
    }

    return next;
  }

  public checkOnEvents = false;
  public indexElem: number | null = null;
  public setObjText = (objText: TObjParamsDrawText) => {
    ssd.objText = objText;
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
    }
    if (index !== null) console.log('клик по ' + index)
  }
  
  handlerMouseMove = (e: MouseEvent) => {
    settingHover(
      ssd.rectsForScene, e, 
      this.hoveredIndexRect, 
      this.setHoveredIndexRect
    );
  }

  handlerClick = (e: MouseEvent) => {
    this.indexElem = settingHover(
      ssd.rectsForScene, e,
      this.hoveredIndexRect,
      this.setHoveredIndexRect
    ) ?? null,
    this.setClickIndexRect(this.indexElem)
  }

  handlerKeyDown = (e: KeyboardEvent) => {
    if (this.indexElem !== null) {
      const text = writingsText(
        this.canvasCtx, e, 
        {
          objText: ssd.objText, 
          set: this.setObjText 
        }, 
        ssd.rectsForScene[this.indexElem]);
      console.log(text);
      // console.log(ssd.objText);
    }
  }
}
