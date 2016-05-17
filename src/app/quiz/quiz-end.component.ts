import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';


@Component({
    selector: 'my-end',
    template: `<section class="finish">
        <h1 class="finish-title">Awesome!</h1>

        <p class="finish-subcopy">
          You did a <strong>Good Job!</strong><br>
          Thank you for playing our game.
        </p>

        <div class="btn-wrap">
          <a (click)="gotoQuiz()" class="btn btn-primary">RESTART</a>
        </div>
      </section>`
})







export class QuizEndComponent{
  constructor (private router: Router) {}

  gotoQuiz(){
    this.router.navigate(['Quiz']);
  }

}
