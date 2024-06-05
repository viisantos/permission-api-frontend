import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-master',
  standalone: false,
  templateUrl: './app-master.component.html',
  styleUrl: './app-master.component.css'
})

export class AppMasterComponent {
    constructor(private authService: AuthService, private router: Router){}

    isLoggedIn(): boolean {
      return this.authService._isLoggedIn();
    }
    
     logout():void {
      console.log("entrei no logout!");
      this.authService.logout().subscribe(response => {
        console.log(response);
        if(response.status){
          this.authService.removeToken();
          this.router.navigate(['/login']);
        }else{
          if(!this.authService._isLoggedIn()){
            console.log("Aviso de erro : Usuário não logado ");
            this.router.navigate(['/login']);
          }
        }
      });
      
    }
}
