import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
    'This is simply a test',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F06%2F19%2FEasy-Meatloaf.jpg',
    [
    new Ingredient('Meat', 1),
    new Ingredient('French Fries', 20)]
    ),
       new Recipe('A Second Recipe',
       'This is simply a test',
       'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F06%2F19%2FEasy-Meatloaf.jpg',
       [
       new Ingredient('Buns',2),
       new Ingredient('Meat',1)]
       )];

    constructor(private shoppingListService: ShoppingListService){

    }

   getRecipes() {
    return this.recipes.slice();
   }

   getRecipe(index: number){
      return this.recipes[index];
    }

   onIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
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
