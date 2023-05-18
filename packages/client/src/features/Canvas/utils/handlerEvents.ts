import { CanvasScenes } from '../canvasScenes';
import { GAMESCENES } from '../const';
import { ssd } from '../storeSessionData';
import { settingHover } from './settingHover';
import { writingsText } from './writingsText';

export class HandlerEvents {
  private that: CanvasScenes;

  constructor(that: CanvasScenes) {
    this.that = that;
  }

  addEventsListener = () => {    
    this.that.canvasRef.addEventListener('click', this.handlerClick)
    this.that.canvasRef.addEventListener('keydown', this.handlerKeyDown)
    this.that.canvasRef.addEventListener('mousemove', this.handlerMouseMove)
  }

  handlerMouseMove = (e: MouseEvent) => {
    settingHover(
      ssd.rectsForScene, e, 
      this.that.hoveredIndexRect, 
      this.that.setHoveredIndexRect
    );
  }

  handlerClick = (e: MouseEvent) => {
    this.that.indexElem = settingHover(
      ssd.rectsForScene, e,
      this.that.hoveredIndexRect,
      this.that.setHoveredIndexRect
    ) ?? null,
    this.that.setClickIndexRect(this.that.indexElem)
  }

  handlerKeyDown = (e: KeyboardEvent) => {
    if (this.that.indexElem !== null && ssd.rectsForScene.length) {
      /* const text = */ writingsText(
        this.that.canvasCtx, e, 
        {
          objText: ssd.objText, 
          set: this.that.setObjText 
        }, 
        ssd.rectsForScene[this.that.indexElem]);
      }
    this.handlerArrow(e);
  }

  handlerArrow = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (this.that.indexElem === null) {
        this.that.indexElem = -1;
      }
      if (this.that.indexElem + 1 < ssd.rectsForScene.length) this.that.indexElem++
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
    } else if (e.key === 'ArrowLeft') {
      if (this.that.indexElem === null) {
        this.that.indexElem = 0;
      }
      if (this.that.indexElem - 1 >= 0) this.that.indexElem--;
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
    } else if (this.that.scenes.active === GAMESCENES.gamersAnswers || this.that.scenes.active === GAMESCENES.finalAnswer) { 
      const lineLength = ssd.mainGamer.numsRivals*2
      if (e.key === 'ArrowDown') {
        if (this.that.indexElem === null) {
          this.that.indexElem = 0;
        } else if (this.that.indexElem + lineLength < ssd.rectsForScene.length) {
          this.that.indexElem+=lineLength
        }
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
      } else if (e.key === 'ArrowUp') {
        if (this.that.indexElem === null) {
          this.that.indexElem = 0;
        } else if (this.that.indexElem - lineLength >= 0) {
          this.that.indexElem-=lineLength
        }
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
      }
    }
  }
}
