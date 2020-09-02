export class LearnWord {
  audio: HTMLAudioElement;
  img?: string;
  animate = false;

  constructor(audio, img?) {
    this.audio = audio;
    this.img = img;
  }
}
