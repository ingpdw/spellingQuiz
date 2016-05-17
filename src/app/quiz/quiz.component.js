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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
var words_service_1 = require('./words.service');
var quiz_step_component_1 = require('./quiz-step.component');
var quiz_image_component_1 = require('./quiz-image.component');
var quiz_word_component_1 = require('./quiz-word.component');
var quiz_end_component_1 = require('./quiz-end.component');
require('rxjs/Rx');
var QuizComponent = (function () {
    function QuizComponent(wordsService, router) {
        this.wordsService = wordsService;
        this.router = router;
        this.totalLength = 0;
        this.currLength = 0;
        this.resultMsg = '';
        this.currQuiz = {
            _id: '',
            words: '',
            image: '',
            level: 0
        };
        this.isShowPush = false;
        this.isUpPush = false;
        this.msgs = ['good!', 'awesome!', 'good job!', 'excellent!', 'marvelous!', 'fantastic!', 'amazing!', 'Wow!', 'wonderful!', 'wizardly!'];
    }
    QuizComponent.prototype.hidePush = function () {
        this.isShowPush = false;
        this.isUpPush = true;
    };
    QuizComponent.prototype._showPush = function () {
        this.isShowPush = true;
        this.isUpPush = false;
    };
    QuizComponent.prototype.showPush = function (msg) {
        var _this = this;
        this._showPush();
        this.resultMsg = msg;
        setTimeout(function () {
            _this.hidePush();
            _this.next();
        }, 2000);
    };
    QuizComponent.prototype.showEnd = function () {
        this.router.navigate(['QuizEnd']);
    };
    QuizComponent.prototype.correct = function () {
        console.log('correct');
        this.showPush(this.msgs[this.currLength - 1]);
    };
    QuizComponent.prototype.wrong = function () {
        console.log('wrong');
        /*this.showPush( this.msgs[3] );*/
    };
    QuizComponent.prototype.next = function () {
        if (this.currLength >= this.totalLength) {
            this.showEnd();
        }
        else {
            var _tmp = this.items[this.currLength];
            this.currQuiz = {
                _id: _tmp._id,
                words: _tmp.words,
                image: _tmp.image,
                level: 0
            };
            this.currLength++;
        }
    };
    QuizComponent.prototype.getWords = function () {
        var _this = this;
        this.wordsService.getWords('10')
            .then(function (res) { return res.json(); })
            .then(function (res) {
            if (res.result !== 'success' || !res.data.length)
                return;
            _this.currLength = 0;
            _this.items = res.data;
            _this.totalLength = _this.items.length;
            _this.next();
        });
    };
    QuizComponent.prototype.ngOnInit = function () { this.getWords(); };
    QuizComponent.prototype.tempNext = function () {
        this.correct();
    };
    QuizComponent = __decorate([
        core_1.Component({
            selector: 'my-quiz',
            template: "<section class=\"quiz\">\n        <quiz-step [totalLength]=totalLength [currLength]=currLength></quiz-step>\n        <quiz-image [curr]=currQuiz></quiz-image>\n        <quiz-word *ngIf=\"currQuiz._id\" [word]=currQuiz [curr]=currQuiz (correct)=\"correct()\" (wrong)=\"wrong()\"></quiz-word>\n    </section>\n    <section [ngClass]=\"{push: true, fadeIn: isShowPush, slideOutUp: isUpPush}\">\n      <div class=\"push-wrap\">\n        <div class=\"push-circle\">\n          <div class=\"rw-table\">\n            <div class=\"rw-cell\">{{resultMsg}}</div>\n          </div>\n        </div>\n      </div>\n    </section>",
            providers: [
                http_1.JSONP_PROVIDERS,
                words_service_1.WordsService,
            ],
            directives: [common_1.NgClass, quiz_step_component_1.QuizStepComponent, quiz_image_component_1.QuizImageComponent, quiz_word_component_1.QuizWordComponent, quiz_end_component_1.QuizEndComponent]
        }), 
        __metadata('design:paramtypes', [words_service_1.WordsService, router_deprecated_1.Router])
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map