import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private loggingService: LoggingService){}
  title = 'my-second-app';
  ngOnInit(){
    this.authService.autoLogin();
    this.loggingService.printLog('hello from appcompnen ng oninit');
  }
}
