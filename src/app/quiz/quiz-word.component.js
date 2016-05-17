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
var Answer = (function () {
    function Answer() {
    }
    return Answer;
}());
exports.Answer = Answer;
var QuizWordComponent = (function () {
    function QuizWordComponent() {
        this.correct = new core_1.EventEmitter();
        this.items = [];
        this.itemsClicked = [];
        this.answerLast = [];
        this.answers = [];
    }
    QuizWordComponent.prototype.shuffle = function (arr) {
        var currIdx = arr.length, tmpValue, randIdx;
        while (0 !== currIdx) {
            randIdx = Math.floor(Math.random() * currIdx);
            currIdx -= 1;
            tmpValue = arr[currIdx];
            arr[currIdx] = arr[randIdx];
            arr[randIdx] = tmpValue;
        }
        return arr;
    };
    QuizWordComponent.prototype.jocker = function ($event) {
        for (var i = 0; this.answers[i]; i++) {
            var _answers = this.answers[i];
            if (_answers.idx == -1) {
                var wordIdx = this.getCorrect(_answers.correct);
                if (wordIdx != -1) {
                    this.answers[i] = { state: 'jocker', idx: i, value: this.items[wordIdx], correct: _answers.correct, last: false };
                    this.itemsClicked[wordIdx] = '1';
                    break;
                }
                else {
                    this.checkCorrect();
                }
            }
        }
        this.checkCorrect();
    };
    QuizWordComponent.prototype.checkCorrect = function () {
        var userAnswer = '', lastIdx = -1;
        for (var i = 0; this.answers[i]; i++) {
            userAnswer += this.answers[i].value;
            this.answers[i].last = false;
            if (this.answers[i].value != '0')
                lastIdx = i;
        }
        console.log(userAnswer.length);
        if (lastIdx >= 0) {
            this.answers[lastIdx].last = true;
        }
        if (userAnswer == this.curr.words) {
            this.correct.emit('event');
        }
        else if (this.answers[this.answers.length - 1].value != '0') {
            this.wrong();
        }
    };
    QuizWordComponent.prototype.wrong = function () {
        for (var i = 0; this.answers[i]; i++) {
            var _answers = this.answers[i];
            if (_answers.value != _answers.correct) {
                _answers.state = 'wrong';
            }
        }
    };
    QuizWordComponent.prototype.clicked = function (spell, idx, state) {
        if (state === void 0) { state = 'click'; }
        for (var i = 0; this.answers[i]; i++) {
            var _answer = this.answers[i];
            if (_answer.idx == -1) {
                _answer.value = spell;
                _answer.idx = i;
                _answer.state = state;
                break;
            }
        }
        this.itemsClicked[idx] = '1';
        this.checkCorrect();
    };
    QuizWordComponent.prototype.start = function () {
        this.itemsClicked = [];
        //answers reset
        this.answers = [];
        var curr = this.curr.words.split('');
        for (var i = 0; this.items[i]; i++) {
            this.answers[i] = { state: 'none', idx: -1, value: '0', correct: curr[i], last: false };
            this.itemsClicked[i] = '0';
        }
    };
    QuizWordComponent.prototype.remove = function ($event, answerIdx) {
        var value = $event.target.value;
        var idx = this.getNotCorrect(value);
        var _answer = this.answers[answerIdx];
        this.answers[answerIdx] = { state: 'none', idx: -1, value: '0', correct: _answer.correct, last: false };
        this.itemsClicked[idx] = '0';
        this.checkCorrect();
    };
    QuizWordComponent.prototype.getCorrect = function (word) {
        var idx = -1;
        for (var i = 0; this.items[i]; i++) {
            var _items = this.items[i];
            if (_items == word && this.itemsClicked[i] != '1') {
                idx = i;
                break;
            }
        }
        return idx;
    };
    QuizWordComponent.prototype.getNotCorrect = function (word) {
        var idx = -1;
        for (var i = 0; this.items[i]; i++) {
            var _items = this.items[i];
            if (_items == word && this.itemsClicked[i] == '1') {
                idx = i;
                break;
            }
        }
        return idx;
    };
    QuizWordComponent.prototype.reset = function () {
        var curr = this.curr.words.split('');
        for (var i = 0; this.answers[i]; i++) {
            var _answer = this.answers[i];
            // if( _answer.state == 'jocker' ){
            //   this.answers[ i ] = {state: 'jocker',idx: _answer.idx, value: _answer.value, correct: curr[ i ], last: false};
            //   this.itemsClicked[ this.getNotCorrect( curr[ i ] ) ] = '1';
            // }else{
            this.answers[i] = { state: 'none', idx: -1, value: '0', correct: curr[i], last: false };
            this.itemsClicked[this.getNotCorrect(curr[i])] = '0';
        }
        this.checkCorrect();
    };
    QuizWordComponent.prototype.ngOnChanges = function () {
        this.items = this.curr.words.split('');
        this.shuffle(this.items);
        this.start();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', quiz_1.Quiz)
    ], QuizWordComponent.prototype, "curr", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], QuizWordComponent.prototype, "correct", void 0);
    QuizWordComponent = __decorate([
        core_1.Component({
            selector: 'quiz-word',
            template: "<div class=\"answer\">\n    <ol class=\"answer-list\">\n\n      <li *ngFor=\"let answer of answers; let idx=index\" [ngClass]=\"{'auto-filled': answer.state == 'jocker', 'wrong-filled': answer.state == 'wrong', 'last':answer.last}\">\n        <span *ngIf=\"!answer.value\"></span>\n        <span *ngIf=\"answer.value != '0'\">{{answer.value}}</span>\n        <button class=\"btn btn-delete\" (click)=\"remove($event, idx)\" [value]=answer.value>x</button>\n      </li>\n    </ol>\n    <button class=\"btn btn-reset\" title=\"reset\" (click)=\"reset()\">X</button>\n  </div>\n  <div class=\"words\">\n    <ul class=\"words-list\">\n      <li *ngFor=\"let item of items; let idx=index\" #anwserBox>\n          <button *ngIf=\"itemsClicked[idx] == '0'\" class=\"btn btn-word\" (click)=\"clicked(item, idx)\">{{item}}</button>\n      </li>\n    </ul>\n  </div>\n  <div class=\"btn-wrap\">\n      <button class=\"btn btn-jocker\" (click)=\"jocker()\">\n        <i class=\"icon icon-jocker\"></i>\n        <span>JOCKER</span>\n      </button>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], QuizWordComponent);
    return QuizWordComponent;
}());
exports.QuizWordComponent = QuizWordComponent;
//# sourceMappingURL=quiz-word.component.js.map