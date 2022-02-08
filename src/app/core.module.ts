import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService} from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingService } from './logging.service';

@NgModule({
  providers: [
    RecipeService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true //allow to use multiple interceptors even if you use one
      },
      LoggingService
  ]
})
export class CoreModule{
}
