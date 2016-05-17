import { Component, Input } from '@angular/core';

@Component({
  selector: 'answer-button',
  template: `<li>
    <span>{{answer}}</span>
    <button class="btn btn-delete" (click)="remove($event, idx)">x</button>
  </li>`
})
export class AnswerButton {
  @Input() data: Object;
}
