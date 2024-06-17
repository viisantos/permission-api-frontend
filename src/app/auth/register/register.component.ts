import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';
import { RoleService } from 'src/app/services/role-service/role.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit{
  errorMessage: string = '';
  roles: any = [];

  constructor(private authService: AuthService, private roleService: RoleService, private router: Router){}

  protected registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rolesSelected: new FormControl([], [Validators.required]) // Campo para armazenar as opções selecionadas
  });

  ngOnInit(): void{
    this.roleService.getRoleListOptions().subscribe(data => {
      this.roles = data;
    });
  }

  onSubmit(){

    if(this.registerForm.valid){
      console.log("antes da requisicao", this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next:(response: any) => {
          console.log(response);
        },
        error: () => {
          this.errorMessage = 'Não foi possível realizar o cadastro.';
        }

      }); 
    }
  }



}
