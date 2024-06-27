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
  import { PermissionComponent } from './permission/permission.component';
  import { PermissionFormComponent } from './permission-form/permission-form.component';
  import { AddPermissionsComponent } from './add-permissions/add-permissions.component';
  import { UserComponent } from './user/user/user.component';
  import { RoleService } from './services/role-service/role.service';
  import { PermissionService } from './services/permission-service/permission.service';
  import { AuthService } from './services/auth-service/auth.service';
  import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatSelectModule } from '@angular/material/select';
  import { MatInputModule } from '@angular/material/input';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { MultiSelectModule } from 'primeng/multiselect';
  import { CheckboxModule } from 'primeng/checkbox';

  const routes: Routes = [
    {
      path: '',
      component: AppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // Outras rotas públicas
    ]},
    { path: 'logout', component:LogoutComponent },
    //{ path: 'roles', component:RoleComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'users', canActivate:([CanActivateAuthGuard]), component: UserComponent },
    { path: 'createuser' , canActivate:([CanActivateAuthGuard]), component: RegisterComponent },
    { path: 'users/edit/:id', canActivate:([CanActivateAuthGuard]), component: RegisterComponent },
    { path: 'roles', canActivate:([CanActivateAuthGuard]), component: RoleComponent },
    { path: 'createrole' , canActivate:([CanActivateAuthGuard]), component: RoleFormComponent },
    { path: 'roles/edit/:id', canActivate:([CanActivateAuthGuard]), component: RoleFormComponent },
    { path: 'permissions', canActivate:([CanActivateAuthGuard]), component: PermissionComponent },
    { path: 'createpermission' , canActivate:([CanActivateAuthGuard]), component: PermissionFormComponent },
    { path: 'roles/:id/manage-permissions' , canActivate:([CanActivateAuthGuard]), component: AddPermissionsComponent },
    { path: 'permissions/edit/:id', canActivate:([CanActivateAuthGuard]), component: PermissionFormComponent }

  ];

  @NgModule({
    imports: [
      BrowserModule,
      //AppRoutingModule,
      FormsModule,
      RouterModule,
      RouterOutlet,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      BrowserAnimationsModule,
      MultiSelectModule,
      CheckboxModule,
      [RouterModule.forRoot(routes)]
    ],
    declarations: [
      AppMasterComponent,
      AppComponent,
      RegisterComponent,
      LogoutComponent,
      RoleComponent,
      RoleFormComponent,
      PermissionComponent,
      PermissionFormComponent,
      AddPermissionsComponent,
      LoginComponent,
      UserComponent
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
                    withCredentials: true,
                    setHeaders: {
                      'Access-Control-Allow-Origin': '*',
                      'Authorization': `Bearer ${authToken}`,
                      // Outros cabeçalhos
                    }
                    //headers: req.headers.set('Authorization', `Bearer ${authToken}`),
                  });
                  console.log("request :", cloned);
                  return next(cloned);
              } else {
                return next(req);
            }
          }
        ])
      ),
      RoleService,
      PermissionService,
      provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
  })

  export class AppModule { }
