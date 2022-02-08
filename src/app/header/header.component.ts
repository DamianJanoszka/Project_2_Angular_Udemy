import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  })
  export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>){}

    ngOnInit(){
      this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user =>{
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
    }

    ngOnDestroy(){
      this.userSub.unsubscribe();
    }

    collapsed = true;
    onSaveData() {
      this.dataStorageService.storeRecipes();
    }

    onLogout(){
      this.authService.logout();
    }

    onFetchData() {
      this.dataStorageService.fetchRecipes().subscribe();
    }
  }
