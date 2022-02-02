import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap} from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService{
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){
  }

    storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put('https://ng-complete-guide-f8be8-default-rtdb.firebaseio.com/recipes.json',
      recipes)
      .subscribe(response => {
        console.log(response);
      });
    }

    fetchRecipes(){
      //take(1) takes one value from observable and then automatically unsubscribes
      //exhaustMap wait for the first Observable to complete
        return this.http
        .get<Recipe[]>('https://ng-complete-guide-f8be8-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
      // if we dont put on our server recipes with ingredients then will ad a empty array
                 return recipes.map(recipe => {
                   return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                 });
               }),
                 tap(recipes =>{
                   this.recipeService.setRecipes(recipes);
                 })
                 );

    }
}
