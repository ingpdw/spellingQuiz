import { Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class WordsService {
  constructor(private jsonp: Jsonp) {}

  getWords (limit: string): Promise<any>{
    let apiUrl = 'https://wordsquiz.herokuapp.com/select';
    let params = new URLSearchParams();
    params.set('limit', limit);
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.request(apiUrl, {search: params}).toPromise();
  }

}
