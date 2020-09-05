import { RouterModule, Routes } from "@angular/router";

import { LearnComponent } from "src/app/pages/word-structures/components/learn/learn.component";
import { MenuComponent } from "src/app/pages/word-structures/components/menu/menu.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { WordStructuresComponent } from "./word-structures.component";
import { WordStructureQuizComponent } from "./components/word-structure-quiz/word-structure-quiz.component";

const routes: Routes = [
  {
    path: "word-structures",
    component: WordStructuresComponent,
    children: [
      { path: "", component: MenuComponent },
      { path: "learn", component: LearnComponent }
    ]
  },
  {
    path: "word-structures/figures-of-speech",
    component: WordStructuresComponent,
    children: [
      { path: "", component: MenuComponent },
      {
        path: ":param",
        component: LearnComponent
      }
    ]
  },
  {
    path: "word-structures/:structure",
    component: LearnComponent
  },
  {
    path: "word-structures/quiz",
    component: WordStructureQuizComponent
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    WordStructuresComponent,
    MenuComponent,
    LearnComponent,
    WordStructureQuizComponent
  ]
})
export class WordStructuresModule {}
