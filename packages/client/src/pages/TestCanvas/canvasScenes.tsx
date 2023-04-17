import { paramsDrawText } from 'shared/utils/canvas/types';
import { questions, source } from 'shared/const/gameLibrary/dataLibrary';
import { drawRoundedRect, drawText, drawImgBorderText } from 'shared/utils/canvas/utilsDrawCanvas';

export const mockRects = [
  {key: '0', left: 74, top: 30, width: 390, height: 570, radius: 20, color: '#242729', borderColor: 'yellow'},
  {key: '1', left: 540, top: 30, width: 450, height: 270, radius: 20, color: '#242729', borderColor: 'red'},
  {key: '2', left: 540, top: 350, width: 450, height: 150, radius: 10, color: '#242729', borderColor: 'orange'}
]

export class CanvasScenes {
  
  startGame(
    canvas: HTMLCanvasElement | null,
    hoveredRect: number | null,
    arrText: paramsDrawText | null
  ) {
    console.log('привет')

    if (!canvas) {
      return;
    }
      
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    canvas.setAttribute('tabIndex', '0');
    canvas.focus();
    
    ctx.fillStyle = '#343739';
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    this.sceneOne(ctx, hoveredRect, arrText)
  }

  sceneOne(
    ctx: CanvasRenderingContext2D, 
    hoveredRect: number | null, 
    arrText: paramsDrawText | null
  ) {
    
    drawImgBorderText(ctx, source.cardFantasyMage, {
      left: 94,
      top: 50,
      width: 350,
      height: 530,
      color: 'black',
      borderPadding: 20,
      borderColor: 'blue',
      shadowOn: hoveredRect === 0,
      radius: 20
    })

    drawImgBorderText(ctx, source.qFantasy, {
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
}
