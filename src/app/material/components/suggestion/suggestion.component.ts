import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
})
export class SuggestionComponent implements OnInit {
  public formControl = new FormControl();
  public textPredict: string = '';
  protected formSub: Subscription;
  constructor(private suggestionService: SuggestionService) {}

  ngOnInit() {
    this.formSub = this.formControl.valueChanges
      .pipe(
        map((i) => {
          this.textPredict = '';
          return i;
        }),
        debounceTime(300),
        mergeMap((i) => {
          this.suggestionService.updateSuggestionData([]);
          return this.suggestionService.fetchSuggestion(i);
        })
      )
      .subscribe((resp) => {
        const len = this.formControl.value.length;
        const result = resp[0];
        this.suggestionService.updateSuggestionData(resp);
        if (result && result.length > 0) {
          this.formControl.setValue(result.substr(0, len), {
            emitEvent: false,
          });
          this.textPredict = result;
        }
      });
  }

  onEnter(): void {
    if (!this.textPredict && this.textPredict === '') return;
    this.formControl.setValue(this.textPredict, { emitEvent: false });
    this.textPredict = '';
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
}
