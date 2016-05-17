import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';


@Component({
    selector: 'my-start',
    template: `
        <section class="start">
          <h1 class="start-title">
            <div class="title-group1">
              <span>S</span><span>P</span><span>E</span><span>L</span><span>L</span><span>I</span><span>N</span><span>G</span>
            </div>

            <div class="title-group2">
              <span>Q</span><span>U</span><span>I</span><span>Z</span><span class="">!</span>
            </div>
          </h1>

          <div class="start-logo"><span>?</span></div>

          <div class="btn-wrap">
            <a (click)="gotoQuiz()" class="btn btn-primary">START</a>
          </div>
        </section>

    
`
})






export class QuizStartComponent{
  constructor (private router: Router) {}

  gotoQuiz(){
    this.router.navigate(['Quiz']);
  }

}
