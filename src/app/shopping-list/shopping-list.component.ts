import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private isChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.isChangeSub = this.shoppingListService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
      });

      this.loggingService.printLog('hello frmo shoppinglist oninit');
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.isChangeSub.unsubscribe();
   }

}
