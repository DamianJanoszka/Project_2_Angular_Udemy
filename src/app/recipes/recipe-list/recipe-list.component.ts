import { Component, OnInit, OnDestroy} from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Recipe} from '../recipe.model';
import{ Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.recipes = this.recipeService.getRecipes();
  this.subscription = this.recipeService.recipesChanged
    .subscribe(
    (recipes: Recipe[]) => {
      this.recipes=recipes;
    });
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
