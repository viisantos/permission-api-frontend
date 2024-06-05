import { NgModule, inject } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { RouterModule, Routes, RouterOutlet, provideRouter} from '@angular/router';
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  //import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { CanActivateAuthGuard } from '../app/guards/auth.guard';

  import { AppMasterComponent } from './app-master/app-master.component';
  import { LoginComponent } from './auth/login/login.component';
  import { RegisterComponent } from './auth/register/register.component';
  import { LogoutComponent } from './logout/logout.component';
  import { RoleComponent } from './role/role.component';
  import { RoleFormComponent } from './role-form/role-form.component';
  import { RoleService } from './services/role-service/role.service';
  import { AuthService } from './services/auth-service/auth.service';
  

  const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component:LogoutComponent },
    //{ path: 'roles', component:RoleComponent },
    { path: 'roles/create', canActivate:([CanActivateAuthGuard]), component:RoleFormComponent },
    { path: 'roles/{{roleId}}/create', canActivate:([CanActivateAuthGuard]), component:RoleFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'roles', canActivate:([CanActivateAuthGuard]), component: RoleComponent }
  ];

  @NgModule({
    imports: [
      BrowserModule,
      //AppRoutingModule,
      FormsModule,
      RouterModule,
      RouterOutlet,
      ReactiveFormsModule,
      [RouterModule.forRoot(routes)]
    ],
    declarations: [
      AppMasterComponent,
      AppComponent,
      RegisterComponent,
      LogoutComponent,
      RoleComponent,
      LoginComponent
    ],
    exports: [RouterModule],
    providers: [
      /*{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:true
       },*/
       AuthService,
      provideHttpClient(
        withInterceptors([
          (req, next) => {
              const authToken = localStorage.getItem('auth_token');
              if(authToken != null){
                  //console.log("Aqui é do interceptor :", authToken);
                  const cloned = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
                  });
                  return next(cloned);
              } else {
                return next(req);
            }
          }
        ])
      ),
      RoleService
    ],
    bootstrap: [AppComponent]
  })

  export class AppModule { }
