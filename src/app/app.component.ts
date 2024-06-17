import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'permission-api-frontend';

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    /*
    if(!this.authService._isLoggedIn()){
      this.router.navigate(['/login']);
    }*/
  }
}
