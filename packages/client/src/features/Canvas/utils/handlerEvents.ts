import { source } from '../../../shared/const/gameLibrary/dataLibrary';
import { CanvasScenes } from '../canvasScenes';
import { GAMESCENES } from '../const';
import { ssd } from '../storeSessionData';
import { settingHover } from './settingHover';
import { writingsText } from './writingsText';
import { KEYS } from '../../../shared/const/constants';

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
    if (this.that.indexElem !== null) {
      this.that.audio.play(source.sounds.click)
    }
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
        if (e.key !== KEYS.Right
          && e.key !== KEYS.Left
          && e.key !== KEYS.Down
          && e.key !== KEYS.Up) {
            this.that.audio.play(source.sounds.clickKey)
          }
      }
    this.handlerArrow(e);
  }

  handlerArrow = (e: KeyboardEvent) => {
    if (e.key === KEYS.Right) {
      if (this.that.indexElem === null) {
        this.that.indexElem = -1;
      }
      if (this.that.indexElem + 1 < ssd.rectsForScene.length) this.that.indexElem++
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
        this.that.audio.play(source.sounds.click);
    } else if (e.key === KEYS.Left) {
      if (this.that.indexElem === null) {
        this.that.indexElem = 0;
      }
      if (this.that.indexElem - 1 >= 0) this.that.indexElem--;
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
        this.that.audio.play(source.sounds.click);
    } else if (this.that.scenes.active === GAMESCENES.gamersAnswers || this.that.scenes.active === GAMESCENES.finalAnswer) { 
      const lineLength = ssd.mainGamer.numsRivals*2
      if (e.key === KEYS.Down) {
        if (this.that.indexElem === null) {
          this.that.indexElem = 0;
        } else if (this.that.indexElem + lineLength < ssd.rectsForScene.length) {
          this.that.indexElem+=lineLength
        }
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
        this.that.audio.play(source.sounds.click)
      } else if (e.key === KEYS.Up) {
        if (this.that.indexElem === null) {
          this.that.indexElem = 0;
        } else if (this.that.indexElem - lineLength >= 0) {
          this.that.indexElem-=lineLength
        }
        this.that.setHoveredIndexRect(this.that.indexElem);
        this.that.setClickIndexRect(this.that.indexElem);
        this.that.audio.play(source.sounds.click)
      }
    }
  }
}
