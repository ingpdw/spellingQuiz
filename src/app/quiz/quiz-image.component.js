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
var quiz_1 = require('./quiz');
var QuizImageComponent = (function () {
    function QuizImageComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', quiz_1.Quiz)
    ], QuizImageComponent.prototype, "curr", void 0);
    QuizImageComponent = __decorate([
        core_1.Component({
            selector: 'quiz-image',
            template: "<div class=\"thumb\">\n            <div class=\"thumb-wrap\">\n              <img [src]=\"curr.image  || ''\" alt=\"\">\n            </div>\n          </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], QuizImageComponent);
    return QuizImageComponent;
}());
exports.QuizImageComponent = QuizImageComponent;
//# sourceMappingURL=quiz-image.component.js.map