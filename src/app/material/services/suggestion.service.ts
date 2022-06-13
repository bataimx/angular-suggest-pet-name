import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import jsonContents from './petNames.json';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private _suggestionData: string[] = [];
  public suggestionChanges: Subject<string[]> = new Subject<string[]>();
  constructor() {}

  fetchSuggestion(text: string): Observable<string[]> {
    const data = jsonContents;
    return new Observable((subscribe) => {
      if (text === '') {
        subscribe.next([]);
        return;
      }
      const regex = new RegExp('^' + text, 'i');
      const result = data.filter((i) => {
        return regex.test(i);
      });
      subscribe.next(result);
    });
  }

  getSuggestionData(): string[] {
    return this._suggestionData;
  }

  updateSuggestionData(data: string[]) {
    this._suggestionData = data;
    this.suggestionChanges.next(this._suggestionData);
  }
}
