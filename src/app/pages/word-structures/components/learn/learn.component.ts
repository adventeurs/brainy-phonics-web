import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { LearnWord } from "src/app/types/learn-word";
import { getAudioPath, getImagePath } from "../../utility";

@Component({
  selector: "app-learn",
  templateUrl: "./learn.component.html",
  styleUrls: ["./learn.component.css"]
})
export class LearnComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  wsData: any;
  img: string;
  index = 0;

  content: LearnWord[] = [];

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
        this.loadContent();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.pauseAudio();
  }

  loadContent() {
    const { wordList } = this.wsData;
    this.img = getImagePath(this.wsData.category, wordList[this.index].words);

    for (let i = 0; i < this.wsData.wordList[this.index].words.length; i++) {
      let audio = new Audio();
      audio.src = getAudioPath(
        this.wsData.category,
        wordList[this.index].audio[i]
      );
      audio.load();
      this.content[i] = new LearnWord(audio);
    }

    this.playAudio(0);
  }

  playAudio(index) {
    setTimeout(() => {
      if (index < this.wsData.wordList[this.index].words.length) {
        this.content[index].animate = true;
        this.content[index].audio.play();
        this.content[index].audio.addEventListener(
          "ended",
          () => {
            this.content[index].animate = false;
            return this.playAudio(index + 1);
          },
          { once: true }
        );
      }
    }, 250);
  }

  pauseAudio() {
    this.content.forEach(audio => {
      audio.audio.pause();
      audio = null;
    });
  }

  play($event) {
    let index = this.wsData.wordList[this.index].words.indexOf(
      $event.innerHTML.trim()
    );
    this.content[index].audio.play();
  }

  updateIndex(type: string, arrayLength: number) {
    switch (type) {
      case "back":
        this.index = this.index > 0 ? this.index - 1 : this.index;
        this.pauseAudio();
        this.loadContent();
        break;
      case "forward":
        this.index = this.index < arrayLength - 1 ? this.index + 1 : this.index;
        this.pauseAudio();
        this.loadContent();
        break;
    }
  }
}
