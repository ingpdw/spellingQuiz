import {enableProdMode, Component, OnInit } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';
import { QuizStartComponent } from './quiz/quiz-start.component';
import { QuizEndComponent } from './quiz/quiz-end.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
enableProdMode();

@Component({
    selector: 'app',
    template: `<div id="main" class="main-container">
        <router-outlet></router-outlet>
        <footer class="footer">&copy; 2016 PJT101</footer>
      </div>`,
    providers:  [ROUTER_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, QuizComponent, QuizStartComponent],
})

@RouteConfig([
  {
    path: '/',
    name: 'QuizStart',
    component: QuizStartComponent,
    useAsDefault: true
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizComponent
  },
  {
    path: '/end',
    name: 'QuizEnd',
    component: QuizEndComponent
  }
])

export class App{
  constructor () {}

}
