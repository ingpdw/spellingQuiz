"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var QuizStepComponent = (function () {
    function QuizStepComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], QuizStepComponent.prototype, "currLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], QuizStepComponent.prototype, "totalLength", void 0);
    QuizStepComponent = __decorate([
        core_1.Component({
            selector: 'quiz-step',
            template: "<div class=\"step\">\n          <span>step:</span>\n          <span class=\"step-current\">{{currLength}}</span>\n          <span>/</span>\n          <span class=\"step-total\">{{totalLength}}</span>\n        </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], QuizStepComponent);
    return QuizStepComponent;
}());
exports.QuizStepComponent = QuizStepComponent;
//# sourceMappingURL=quiz-step.component.js.map