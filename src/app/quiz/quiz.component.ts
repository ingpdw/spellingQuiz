import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import { JSONP_PROVIDERS, Response }  from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { WordsService } from './words.service';
import { QuizStepComponent } from './quiz-step.component';
import { QuizImageComponent } from './quiz-image.component';
import { QuizWordComponent } from './quiz-word.component';
import { QuizEndComponent } from './quiz-end.component';
import { Quiz } from './quiz';
import 'rxjs/Rx';

@Component({
    selector: 'my-quiz',
    template: `<section class="quiz">
        <quiz-step [totalLength]=totalLength [currLength]=currLength></quiz-step>
        <quiz-image [curr]=currQuiz></quiz-image>
        <quiz-word *ngIf="currQuiz._id" [word]=currQuiz [curr]=currQuiz (correct)="correct()" (wrong)="wrong()"></quiz-word>
    </section>
    <section [ngClass]="{push: true, fadeIn: isShowPush, slideOutUp: isUpPush}">
      <div class="push-wrap">
        <div class="push-circle">
          <div class="rw-table">
            <div class="rw-cell">{{resultMsg}}</div>
          </div>
        </div>
      </div>
    </section>`,
    providers:  [
      JSONP_PROVIDERS,
      WordsService,
    ],
    directives: [NgClass, QuizStepComponent, QuizImageComponent, QuizWordComponent, QuizEndComponent]
})

export class QuizComponent implements OnInit{
  constructor (private wordsService: WordsService, private router: Router) {
  }
  totalLength = 0;
  currLength = 0;

  resultMsg = ''
  currQuiz = {
    _id: '',
    words: '',
    image: '',
    level: 0
  };

  isShowPush = false;
  isUpPush = false;

  items: Array<Quiz>;
  msgs: Array<string> = ['good!', 'awesome!', 'good job!', 'excellent!', 'marvelous!', 'fantastic!', 'amazing!', 'Wow!', 'wonderful!', 'wizardly!'];

  hidePush(){
    this.isShowPush = false;
    this.isUpPush = true;
  }

  _showPush(){
    this.isShowPush = true;
    this.isUpPush = false;
  }

  showPush( msg:string ){
    this._showPush();
    this.resultMsg = msg;

    setTimeout(() => {
      this.hidePush();
      this.next();
    }, 2000);
  }

  showEnd(){
    this.router.navigate(['QuizEnd']);
  }

  correct(){
console.log('correct');
    this.showPush( this.msgs[ this.currLength - 1 ] );
  }

  wrong(){
console.log('wrong');
    /*this.showPush( this.msgs[3] );*/
  }

  next(){
    if( this.currLength >= this.totalLength ){
      this.showEnd();
    }else{

       let _tmp = this.items[this.currLength];
        this.currQuiz = {
          _id: _tmp._id,
          words: _tmp.words,
          image: _tmp.image,
          level: 0
        };

      this.currLength++;
    }

  }

  getWords(){
    this.wordsService.getWords( '10' )
      .then((res: Response)  => res.json())
      .then((res) => {
        if (res.result !== 'success' || !res.data.length) return;

        this.currLength = 0;
        this.items = res.data;
        this.totalLength = this.items.length;
        this.next();
      });
  }
  ngOnInit() { this.getWords(); }

  tempNext(){
    this.correct();
  }
}
