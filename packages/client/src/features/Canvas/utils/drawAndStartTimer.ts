import { ssd } from '../storeSessionData';
import { JSCOLORS } from '../const';
import { drawText } from './drawText';

import { TTimerWithCback } from '../types';

/**
 * Запускает и рисует на канвасе таймер нужной длительности с опциональным колбеком
 * @param ctx контекст канваса
 * @param props параметры таймера см.типизацию (опционально можно передать cback, который запустится по окончании таймера)
 */
export const drawAndStartTimer = (
  ctx: CanvasRenderingContext2D, 
  props: TTimerWithCback
) => {
  const {nameTimer, numsSeconds, cback} = props;
  const left = props.left ?? 0;
  const top = props.top ?? 0;
  const width = props.width ?? 0;
  const height = props.height ?? 0;
  const drawOff = props.drawOff ?? false;
  const fontSize = props.fontSize ?? 20;
  const textColor = props.textColor ?? JSCOLORS.white;
  const fnums = props.countFloatNumbers ?? 0;
  const decr = 1 / (10 ** fnums);
  const fps = 1000 / (10 ** fnums);

  if (!ssd.timers[nameTimer]) {
    ssd.timers[nameTimer] = {
      timer: null, // сам таймер, пока инициализируем в null
      counter: numsSeconds,  // число секунд таймера
      checkEnd: false, // проверка конца таймера
      checkCback: false, // проверка единственного вызова колбека
      bgImg: null
    };
  }

  const timerId = ssd.timers[nameTimer]; // делаем короткую ссылку на таймер

  if (timerId.timer === null && !timerId.checkEnd) { // если таймер не создан и он не закончился, то создаем новый таймер
    if (!drawOff) {
      timerId.bgImg = ctx.getImageData(left, top, width, height)
    }
    timerId.timer = setInterval(() => {
      timerId.counter-=decr;
      if (!drawOff) {
        // ctx.fillStyle = JSCOLORS.black; // TODO сделать возможность прямоугольников с таймером
        // ctx.clearRect(left, top, width, height);
        if (timerId.bgImg) {
          ctx.putImageData(timerId.bgImg, left, top);
        }
        drawText(ctx, {
          left: left + 4, 
          top: top + fontSize,
          width: width,
          text: `${timerId.counter <= 0
              ? Math.round(timerId.counter / 60)
              : Math.floor(timerId.counter / 60)
            }:${(timerId.counter % 60).toFixed(fnums)}`,
          fontSize: fontSize,
          textColor: textColor
        })
      }
      if (timerId.counter <= 0) {
        if (timerId.timer !== null) {
          clearInterval(timerId.timer);
        }
        timerId.checkEnd = true;
        //delete ssd.timers[nameTimer]
      }
      if (timerId.counter <= 0 && cback && !timerId.checkCback) {
        timerId.checkCback = true;
        cback();
      }
    }, fps);
  } else {
    if (!drawOff) {
      // ctx.fillStyle = JSCOLORS.black;
      // ctx.clearRect(left, top, width, height)
      timerId.bgImg = ctx.getImageData(left, top, width, height)
      if (timerId.bgImg) {
        ctx.putImageData(timerId.bgImg, left, top);
      }
      drawText(ctx, {
        left: left + 4, 
        top: top + fontSize,
        width: width,
        text: `${
          timerId.counter <= 0
            ? '0'
            : Math.floor(timerId.counter / 60)
          }:${(timerId.counter % 60).toFixed(fnums)}`,
        fontSize: fontSize,
        textColor: textColor
      })
    }
    if (timerId.counter <= 0 && cback && !timerId.checkCback) {
      timerId.checkCback = true;
      cback();
    } 
  }
}
