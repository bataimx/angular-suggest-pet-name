import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css'],
})
export class SuggestionListComponent implements OnInit {
  public listItem: string[] = [];
  private sub: Subscription;
  constructor(private suggestionService: SuggestionService) {}

  ngOnInit() {
    this.sub = this.suggestionService.suggestionChanges.subscribe((resp) => {
      this.listItem = resp;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
