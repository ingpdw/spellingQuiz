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
var router_deprecated_1 = require('@angular/router-deprecated');
var QuizStartComponent = (function () {
    function QuizStartComponent(router) {
        this.router = router;
    }
    QuizStartComponent.prototype.gotoQuiz = function () {
        this.router.navigate(['Quiz']);
    };
    QuizStartComponent = __decorate([
        core_1.Component({
            selector: 'my-start',
            template: "\n        <section class=\"start\">\n          <h1 class=\"start-title\">\n            <div class=\"title-group1\">\n              <span>S</span><span>P</span><span>E</span><span>L</span><span>L</span><span>I</span><span>N</span><span>G</span>\n            </div>\n\n            <div class=\"title-group2\">\n              <span>Q</span><span>U</span><span>I</span><span>Z</span><span class=\"\">!</span>\n            </div>\n          </h1>\n\n          <div class=\"start-logo\"><span>?</span></div>\n\n          <div class=\"btn-wrap\">\n            <a (click)=\"gotoQuiz()\" class=\"btn btn-primary\">START</a>\n          </div>\n        </section>\n\n    \n"
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], QuizStartComponent);
    return QuizStartComponent;
}());
exports.QuizStartComponent = QuizStartComponent;
//# sourceMappingURL=quiz-start.component.js.map