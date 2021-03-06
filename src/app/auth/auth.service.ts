import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData{
  kind:string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  //user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>){}


   autoLogin(){
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData){
        return;
      }
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
       );

      if(loadedUser.token) {
//         this.user.next(loadedUser);
        this.store.dispatch(new AuthActions.AuthenticateSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)
        })
        );
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }

   }

   logout(){
//     this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
   }

   autoLogout(expirationDuration: number){
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration);
   }

   private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
     const expirationDate = new Date(
              new Date().getTime() + expiresIn*1000
              );
            //this.user.next(user);
            const user = new User(email, userId, token, expirationDate);
            this.store.dispatch(new AuthActions.AuthenticateSuccess({email: email, userId: userId, token: token, expirationDate: expirationDate}))
            this.autoLogout(expiresIn*1000);
            //saving the user data in variable userData so that after refreshing the page we can get access to our token
            localStorage.setItem('userData', JSON.stringify(user));
   }

   private handleError(errorRes: HttpErrorResponse){

        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'User does not exist';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Failed to login';
            break;

        }
        return throwError(errorMessage);
   }
}
