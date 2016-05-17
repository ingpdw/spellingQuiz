import { Component, Input } from '@angular/core';
import { Quiz} from './quiz';

@Component({
  selector: 'quiz-image',
  template: `<div class="thumb">
            <div class="thumb-wrap">
              <img [src]="curr.image  || ''" alt="">
            </div>
          </div>`
})
export class QuizImageComponent {
  @Input() curr: Quiz;
}
