import { Component, OnInit, OnDestroy } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { LearnWord } from "src/app/types/learnWord";

@Component({
  selector: "app-learn",
  templateUrl: "./learn.component.html",
  styleUrls: ["./learn.component.css"]
})
export class LearnComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  wsData: any;
  index = 0;

  audio: LearnWord[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.paramMap
      .pipe(
        switchMap((param: ParamMap) =>
          this.http.get("assets/json/" + param.get("param") + ".json")
        )
      )
      .subscribe(json => {
        this.wsData = json;
        this.loadAudio();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.audio.forEach(audio => {
      audio.audio.pause();
      audio = null;
    });
  }

  loadAudio() {
    const { wordList } = this.wsData;

    for (let i = 0; i < 2; i++) {
      let audio = new Audio();
      audio.src = this.getAudioPath(wordList[this.index].audio[i]);
      audio.load();
      this.audio.push(new LearnWord(audio));
    }

    this.playAudio(0);
  }

  playAudio(index) {
    if (index < 2) {
      this.audio[index].animate = true;
      this.audio[index].audio.play();
      this.audio[index].audio.addEventListener(
        "ended",
        () => {
          this.audio[index].animate = false;
          return this.playAudio(index + 1);
        },
        false
      );
    }
  }

  play($event) {
    let index = this.wsData.wordList[this.index].words.indexOf(
      $event.innerHTML.trim()
    );
    this.audio[index].audio.play();
  }

  getAudioPath(word) {
    return `assets/audio/phonemes/${word}`;
  }

  getImagePath(word: string) {
    return `assets/img/word-structures/${word}.png`;
  }

  updateIndex(type: string, arrayLength: number) {
    switch (type) {
      case "back":
        this.index = this.index > 0 ? this.index - 1 : this.index;
        this.loadAudio();
        break;
      case "forward":
        this.index = this.index < arrayLength - 1 ? this.index + 1 : this.index;
        this.loadAudio();
        break;
    }
  }
}
