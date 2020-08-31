import { Component, OnInit, OnDestroy } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-learn",
  templateUrl: "./learn.component.html",
  styleUrls: ["./learn.component.css"]
})
export class LearnComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  wsData: any;
  wsData$: Observable<any>;
  index = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(param => {
      this.wsData$ = this.http.get(
        "assets/json/" + param.get("param") + ".json"
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getImagePath(word: string) {
    return `assets/img/word-structures/${word}.png`;
  }

  updateIndex(type: string, arrayLength: number) {
    switch (type) {
      case "back":
        this.index = this.index > 0 ? this.index - 1 : this.index;
        break;
      case "forward":
        this.index = this.index < arrayLength - 1 ? this.index + 1 : this.index;
        break;
    }
  }
}
