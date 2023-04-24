import { paramsDrawText } from 'shared/utils/canvas/types';
import { questions, source } from 'shared/const/gameLibrary/dataLibrary';
import { drawRoundedRect, drawText, drawImgBorderText, drawImageOnload } from 'shared/utils/canvas/utilsDrawCanvas';

type TCardQuestion = { 
  open?: boolean, 
  type: 'black' | 'england' | 'modern' | 'fantasy', 
  index: number
}

export const mockRects = [
  {key: '0', left: 74, top: 30, width: 390, height: 570, radius: 20, color: '#242729', borderColor: 'yellow'},
  {key: '1', left: 540, top: 30, width: 450, height: 270, radius: 20, color: '#242729', borderColor: 'red'},
  {key: '2', left: 540, top: 350, width: 450, height: 150, radius: 10, color: '#242729', borderColor: 'orange'},

  {key: 'forSceneWritingAnswer', left: 50, top: 515, width: 924, height: 105, radius: 10, color: '#242729', borderColor: 'grey', fontSize: 30}
]

//export const mockUsersAndAnswers = 

export class CanvasScenes {
  
  private static arrCardBack = [
    {left: 32, top: 110, width: 300, height: 197, src: source.cards.back[0]},
    {left: 360, top: 110, width: 300, height: 197, src: source.cards.back[1]},
    {left: 688, top: 110, width: 300, height: 197, src: source.cards.back[0]},
    {left: 200, top: 340, width: 300, height: 197, src: source.cards.back[1]},
    {left: 533, top: 340, width: 300, height: 197, src: source.cards.back[1]},
  ]
  /* async */ startGame(
    canvas: HTMLCanvasElement | null,
    hoveredRect: number | null,
    arrText: paramsDrawText | null
  ) {
    console.log('привет')
    /* let */const next = false;

    if (!canvas) {
      return next;
    }
      
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return next;
    }

    canvas.setAttribute('tabIndex', '0');
    canvas.focus();
    
    //ctx.fillStyle = '#343739';
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
    drawText(ctx, {left: 790, top: 0, width: 100, height: 100, text: 'Testing Draw\nby @odetocoders\n', fontSize: 25, textColor: 'orange'});


    // this.sceneTest(ctx, hoveredRect, arrText)
    // this['sceneSelect'](ctx, 'Выберите профессию', source.cards['england'].profession)
    // this['sceneSelect'](ctx, 'Выберите тайну', source.cards['england'].secrets)
    /* this['sceneFiveQuestions'](ctx, [
      {open: true, type: 'black', index: 0},
      {open: true, type: 'england', index: 1},
      {open: true, type: 'fantasy', index: 2},
      {open: false, type: 'black', index: 5},
      {open: false, type: 'modern', index: 2},
    ]) */
    // this['sceneWriteAnswer'](ctx, {type: 'black', index: 3}, hoveredRect, arrText)
    this['sceneAnswersAndThink'](ctx, {
      Gamer12345: 'Живу в лесу, люблю есть мухоморы, иногда встречаю лакомые поганки, иногда приходится быть на диете и пить одну только воду',
      Gamer2: 'Ношу, ношу, уже устал, ох, как же так, и нет ни конца, ни начала этим письмам',
      Gamer3: 'Встретил я однажды золотую монетку, с тех пор с золотом не расстаюсь, люблю его как самого себя',
      Gamer4: 'Я Завулон, Маг и Великий Воин в одном лице, Вы никогда не догадаетесь, откуда я пришел и куда иду',
      Gamer5: 'Вы думаете, у меня не бывает неудач? Еще как'
    }, [ // ответы игрока
      [1, 14, 13, 4, 7, 6, 3, 8, 9, 10],
      [1, 2, 10, 4, 5, 6, 7, 8, 9, 10],
      [1, 2, 3, 4, 10, 6, 7, 8, 9, 10],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ], 'england')

    return false;
  }

  sceneTest(
    ctx: CanvasRenderingContext2D, 
    hoveredRect: number | null, 
    arrText: paramsDrawText | null
  ) {
    
    drawImgBorderText(ctx, source.cards.england.profession[0], {
      left: 94,
      top: 50,
      width: 350,
      height: 530,
      color: 'black',
      borderPadding: 10,
      borderColor: 'orange',
      shadowOn: hoveredRect === 0,
      radius: 10
    })

    drawImgBorderText(ctx, source.qfantasy, {
      left: 540,
      top: 30,
      width: 450,
      height: 270,
      color: 'black',
      borderColor: 'orange',
      shadowOn: hoveredRect === 1,
      radius: 20
    }, {
      text: questions.fantasy[0]
    })

    //отрисовываем весь массив mock-прямоугольников-областей
    mockRects.forEach((rect, i) => {
      if (i == 2) drawRoundedRect(ctx, rect, hoveredRect === i)
    })

    //TODO drawText еще поменять чтобы тоже был массивом полей
    if (arrText) drawText(ctx, arrText);   

    drawText(ctx, {left: 830, top: 550, width: 100, height: 100, text: 'Testing Draw\nby @odetocoders\n', fontSize: 25, textColor: 'orange'});
  }


  /* async */ sceneSelect(
    ctx: CanvasRenderingContext2D,
    text: string,
    profOrSecrets: string[]
  ) {
    // запускаем таймер
    this.helperDrawTimer(ctx, {
      nameTimer: text === 'Выберите тайну' ? 'sceneSelectSecret' : 'sceneSelectProf',
      numsSeconds: 29.99,
      left: 467,
      top: 304,
      width: 85,
      height: 35,
      fontSize: 32,
      textColor: 'white',
    })
    console.log(CanvasScenes.timers)
    
    drawText(ctx, {
      left: 450, top: 28, width: 124, height: 32, 
      text: text, 
      fontSize: 25, 
      textColor: 'white'});

    /* await */ drawImgBorderText(ctx, profOrSecrets[0], {
      left: 90,
      top: 85,
      width: 347,
      height: 526,
      color: 'black',
      borderPadding: 5,
      borderColor: 'orange',
      // shadowOn: hoveredRect === 0,
      radius: 5
    })

    /* await */ drawImgBorderText(ctx, profOrSecrets[1], {
      left: 577,
      top: 85,
      width: 347,
      height: 526,
      color: 'black',
      borderPadding: 5,
      borderColor: 'orange',
      // shadowOn: hoveredRect === 0,
      radius: 5
    })
  }

  sceneFiveQuestions(
    ctx: CanvasRenderingContext2D, 
    arrQuestions: TCardQuestion[]
  ){

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
    ctx: CanvasRenderingContext2D,
    cardQuestion: TCardQuestion,
    hoveredRect: number | null, 
    arrText: paramsDrawText | null
  ){
    this.helperDrawTimer(ctx, {
      nameTimer: 'writeAnswer',
      numsSeconds: 59.99,
      left: 477,
      top: 474,
      width: 70,
      height: 35,
      fontSize: 25,
      textColor: 'white',
    })

    drawImgBorderText(ctx, source[`q${cardQuestion.type}`], {
      left: 222,
      top: 85,
      width: 580,
      height: 362,
      color: 'black',
      borderPadding: 20,
      borderColor: this.helperBorderColor(cardQuestion.type),
      // shadowOn: hoveredRect === 0,
      radius: 30
    },{
      text: questions[ cardQuestion.type ][ cardQuestion.index ]
    })

    drawRoundedRect(ctx, mockRects[3], hoveredRect === 3);
    if (arrText) drawText(ctx, {...arrText, fontSize: 30});
  }
  
  private static arrPlaceUsersAnswer = {
    topName: 60, topOffset: 110,
    left: 52, top: 100, width: 370, height: 72
  }
  private static objCoordsNotes = {
    topName: 430,
    left: 473, top: 475, width: 50.5, height: 19.5
  }

  sceneAnswersAndThink(
    ctx: CanvasRenderingContext2D,
    usersAndAnswer: {[key in string]: string}, // сюда должно прийти массив в {имяСоперника: егоОтвет}
    myAnswers: number[][],
    type: 'england' | 'fantasy' | 'modern'
  ){
    const cs = CanvasScenes;
    const userCoords = cs.arrPlaceUsersAnswer;
    // запускаем таймер
    this.helperDrawTimer(ctx, {
      nameTimer: 'sceneAnswers',
      numsSeconds: 59.99,
      left: 487,
      top: 45,
      width: 70,
      height: 35,
      fontSize: 25,
      textColor: 'white',
    })
    // console.log(cs.timers.sceneAnswers)

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

    drawImgBorderText(ctx, source.notebookSmall, {
      left: 460,
      top: 400,
      width: 530,
      height: 205,
      color: 'transparent',
      borderPadding: 5,
      borderColor: this.helperBorderColor(type),
      // shadowOn: hoveredRect === 0,
      radius: 5
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

    myAnswers.forEach((line, indexLine) => {
      line.forEach((answer, index) => {
        drawText(ctx, {
          left: cs.objCoordsNotes.left + (cs.objCoordsNotes.width*index),
          top: cs.objCoordsNotes.top + (cs.objCoordsNotes.height*indexLine),
          width: cs.objCoordsNotes.width,
          fontSize: 16,
          textColor: 'black',
          text: answer.toString()
        })
      })
    })


    // drawRoundedRect(ctx, mockRects[3], hoveredRect === 3);
    // if (arrText) drawText(ctx, {...arrText, fontSize: 30});
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
      checkEnd: boolean
    }
  } = {};

  helperDrawTimer(ctx: CanvasRenderingContext2D, props: {
    nameTimer: string,
    numsSeconds: number,
    left: number, 
    top: number, 
    width: number, 
    height: number, 
    fontSize?: number, 
    textColor?: string,
    cback?: () => void, 
  }) {
    const {nameTimer, numsSeconds, left, top, width, height} = props;
    const fontSize = props.fontSize ?? 20;
    const textColor = props.textColor ?? 'white';

    if (!CanvasScenes.timers[nameTimer]) {
      CanvasScenes.timers[nameTimer] = {
        timer: null, // в 0 будет сам таймер, пока инициализируем в null
        counter: numsSeconds,  // в 1 запиываем число секунд таймера
        checkEnd: false // в 2 будет проверка конца таймера
      };
    }

    const timerId = CanvasScenes.timers[nameTimer]; // делаем короткую ссылку на таймер

    if (timerId.timer === null && !timerId.checkEnd) {
      timerId.timer = setInterval(() => {
        if (timerId.counter <= 0) {
          if (timerId.timer !== null) {
            clearInterval(timerId.timer);
          }
          timerId.checkEnd = true;
          //delete CanvasScenes.timers[nameTimer]
        }
        ctx.fillStyle = 'black'; // TODO сделать возможность прямоугольников с таймером
        ctx.clearRect(left, top, width, height)
        drawText(ctx, {
          left: left + 4, 
          top: top + fontSize, 
          text: timerId.counter <= 0
            ? '_end_'
            : `0:${(timerId.counter-=0.1).toFixed(1)}`,
          fontSize: fontSize, 
          textColor: textColor
        })      
      }, 100);
    } else {
      ctx.fillStyle = 'black';
      ctx.clearRect(left, top, width, height)
      drawText(ctx, {
        left: left + 4, 
        top: top + fontSize,
        text: timerId.counter <= 0
        ? '_end_'
        : `0:${timerId.counter.toFixed(1)}`,
        fontSize: fontSize,
        textColor: textColor
      })   
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
