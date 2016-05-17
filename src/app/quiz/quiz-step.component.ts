import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-step',
  template: `<div class="step">
          <span>step:</span>
          <span class="step-current">{{currLength}}</span>
          <span>/</span>
          <span class="step-total">{{totalLength}}</span>
        </div>`
})
export class QuizStepComponent {
  @Input() currLength: number;
  @Input() totalLength: number;
}
