import { ssd } from './storeSessionData';

export class SoundPlayer {
  private audioCtx!: AudioContext;
  private gainNode!: GainNode;
  private sources: AudioBufferSourceNode[] = [];
  private volume = 1;
  private static __INSTANCE__: SoundPlayer | null =null;

  constructor() {
    if (SoundPlayer.__INSTANCE__ !== null) {
      return SoundPlayer.__INSTANCE__;
    }    
    SoundPlayer.__INSTANCE__ = this;

    this.audioCtx = new AudioContext();
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.connect(this.audioCtx.destination);
  }

  public play = (url: string, loopOn = false) => {
    const audioBuffer = ssd.audioStore.get(url);
    if (!audioBuffer) return;

    const source = this.audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.gainNode);
    if (loopOn) {
      source.loop = true;
    }
    source.start();

    this.sources.push(source);
  }

  public stopAll = () => {  
    this.sources.forEach(
      source => source.stop()
    );
    this.sources = [];
  }

  public setVolume = (volume: number) => {
    if (volume === -10 && this.volume >= 0.1) {
      this.volume -= 0.1;
      console.log(this.volume)
      this.gainNode.gain.value = this.volume;
    } else if (volume === 10 && this.volume <= 0.9) {
      this.volume += 0.1;
      console.log(this.volume)
      this.gainNode.gain.value = this.volume;
    } else if (volume >= 0 && volume <= 1){
      this.gainNode.gain.value = volume;
    }
  }

  public loadSoundsInCache = async (obj: Record<string, string>) => {
    for (const [_, url] of Object.entries(obj)) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
      ssd.audioStore.set(url, audioBuffer); 
    }
  }
}
