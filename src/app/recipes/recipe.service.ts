import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

//   private recipes: Recipe[] = [
//     new Recipe('A Test Recipe',
//     'This is simply a test',
//     'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F06%2F19%2FEasy-Meatloaf.jpg',
//     [
//     new Ingredient('Meat', 1),
//     new Ingredient('French Fries', 20)]
//     ),
//        new Recipe('A Second Recipe',
//        'This is simply a test',
//        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F06%2F19%2FEasy-Meatloaf.jpg',
//        [
//        new Ingredient('Buns',2),
//        new Ingredient('Meat',1)]
//        )];

    private recipes: Recipe[] = [];

    constructor(
    private store: Store<fromApp.AppState>){

    }

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

   getRecipes() {
    return this.recipes.slice();
   }

   getRecipe(index: number){
      return this.recipes[index];
    }

   onIngredientsToShoppingList(ingredients: Ingredient[]) {
   // this.shoppingListService.addIngredients(ingredients);
   this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
   }

   addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
   }

   updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
   }

   deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
   }
}
