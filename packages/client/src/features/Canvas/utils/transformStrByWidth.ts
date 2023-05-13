import { FONTS } from '../const';

  /**
   * Трансформация строки под заданную ширину (вставка в строку \n)
   * @param ctx контекст канваса
   * @param str строка
   * @param width требуемая ширина
   * @param fontSize ? размер шрифта для расчета, по умолчанию 20
   * @returns преобразованная строка со встроенными \n в нужных местах по ширине
   */
  
  export const transformStrByWidth = (
    ctx: CanvasRenderingContext2D,
    str: string,
    width: number,
    fontSize?: number
  ) => {
    str = str.replace(/[\n\r]/g, ''); // очищаем от \n и \r если есть
    const arrWords = str.split(' ');
    let line = '';
    const lines = [];
    const sizeText = fontSize ?? 20;
    ctx.font = `bold ${sizeText}px ${FONTS.mainCanvas}`

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
