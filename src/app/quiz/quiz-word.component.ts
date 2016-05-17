import { ViewChild, ViewChildren, Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Quiz } from './quiz';

export class Answer{
  state: string; //click, joker, none
  idx: number;
  value: string;
  correct: string;
  last: boolean;
}

@Component({
  selector: 'quiz-word',
  template: `<div class="answer">
    <ol class="answer-list">

      <li *ngFor="let answer of answers; let idx=index" [ngClass]="{'auto-filled': answer.state == 'jocker', 'wrong-filled': answer.state == 'wrong', 'last':answer.last}">
        <span *ngIf="!answer.value"></span>
        <span *ngIf="answer.value != '0'">{{answer.value}}</span>
        <button class="btn btn-delete" (click)="remove($event, idx)" [value]=answer.value>x</button>
      </li>
    </ol>
    <button class="btn btn-reset" title="reset" (click)="reset()">X</button>
  </div>
  <div class="words">
    <ul class="words-list">
      <li *ngFor="let item of items; let idx=index" #anwserBox>
          <button *ngIf="itemsClicked[idx] == '0'" class="btn btn-word" (click)="clicked(item, idx)">{{item}}</button>
      </li>
    </ul>
  </div>
  <div class="btn-wrap">
      <button class="btn btn-jocker" (click)="jocker()">
        <i class="icon icon-jocker"></i>
        <span>JOCKER</span>
      </button>
    </div>`
})
export class QuizWordComponent{
  @Input() curr: Quiz;
  @Output() correct: EventEmitter<any> = new EventEmitter();

  items:string[] = [];
  itemsClicked:string[] = [];

  answerLast:string[] = [];
  answers:Answer[] = [];

  shuffle(arr: string[]) {
    let currIdx = arr.length,
        tmpValue: string,
        randIdx: number;

    while (0 !== currIdx) {
      randIdx = Math.floor(Math.random() * currIdx);
      currIdx -= 1;
      tmpValue = arr[currIdx];
      arr[currIdx] = arr[randIdx];
      arr[randIdx] = tmpValue;
    }
    return arr;
  }

  jocker($event: any){
    for( let i = 0; this.answers[ i ]; i++ ){
      let _answers = this.answers[ i ];
      if( _answers.idx == -1 ){

        let wordIdx = this.getCorrect( _answers.correct );

        if( wordIdx != -1 ){
          this.answers[ i ] = {state: 'jocker',idx: i, value: this.items[ wordIdx ], correct: _answers.correct, last: false};
          this.itemsClicked[ wordIdx ] = '1';
          break;
        }else{
          this.checkCorrect();
        }
      }

    }
    this.checkCorrect();
  }

  checkCorrect(){
    let userAnswer = '', lastIdx = -1;
    for( let i = 0; this.answers[ i ]; i++ ){
      userAnswer += this.answers[ i ].value;
      this.answers[ i ].last = false;

      if( this.answers[ i ].value != '0' ) lastIdx = i;

    }

    console.log( userAnswer.length);

    if( lastIdx >= 0 ){
      this.answers[ lastIdx ].last = true;
    }

    if( userAnswer == this.curr.words ){
      this.correct.emit( 'event' );
    }else if( this.answers[ this.answers.length - 1 ].value != '0' ){
      this.wrong();
    }


  }

  wrong(){
    for( let i = 0; this.answers[ i ]; i++ ){
      let _answers = this.answers[ i ];
      if( _answers.value != _answers.correct ){
        _answers.state = 'wrong';
      }
    }
  }

  clicked(spell: string, idx: string, state: string = 'click'){
    for( let i = 0; this.answers[ i ]; i++ ){
      let _answer = this.answers[ i ];
      if( _answer.idx == -1 ){
        _answer.value = spell;
        _answer.idx = i;
        _answer.state = state;
        break;
      }

    }
    this.itemsClicked[ idx ] = '1';
    this.checkCorrect();

  }

  start(){

    this.itemsClicked = [];
    //answers reset

    this.answers= [];

    let curr = this.curr.words.split( '' );
    for( let i = 0; this.items[ i ]; i++ ){
        this.answers[ i ] = {state: 'none',idx: -1, value: '0', correct: curr[ i ], last: false};
        this.itemsClicked[ i ] = '0';
    }
  }

  remove($event: any, answerIdx: string){
    let value = $event.target.value;
    let idx = this.getNotCorrect( value );
    let _answer = this.answers[ answerIdx ];
    this.answers[ answerIdx ] = {state: 'none',idx: -1, value: '0', correct: _answer.correct, last: false};
    this.itemsClicked[ idx  ] = '0';
    this.checkCorrect();
  }


  getCorrect( word:string ):number{
    let idx = -1;
    for( let i = 0; this.items[ i ]; i++ ){
      let _items =  this.items[ i ];

      if( _items == word && this.itemsClicked[ i ] != '1' ){
        idx = i;
        break;
      }
    }

    return idx;
  }

  getNotCorrect( word:string ):number{
    let idx = -1;
    for( let i = 0; this.items[ i ]; i++ ){
      let _items =  this.items[ i ];
      if( _items == word && this.itemsClicked[ i ] == '1' ){
        idx = i;
        break;
      }
    }
    return idx;
  }

  reset(){
    let curr = this.curr.words.split( '' );
    for( let i = 0; this.answers[ i ]; i++ ){
      let _answer = this.answers[ i ];

      // if( _answer.state == 'jocker' ){
      //   this.answers[ i ] = {state: 'jocker',idx: _answer.idx, value: _answer.value, correct: curr[ i ], last: false};
      //   this.itemsClicked[ this.getNotCorrect( curr[ i ] ) ] = '1';
      // }else{
        this.answers[ i ] = {state: 'none',idx: -1, value: '0', correct: curr[ i ], last: false};
        this.itemsClicked[ this.getNotCorrect( curr[ i ] )  ] = '0';
      //}
    }

    this.checkCorrect();
  }

  ngOnChanges() {
    this.items = this.curr.words.split( '' );
    this.shuffle( this.items );
    this.start();
  }
}
