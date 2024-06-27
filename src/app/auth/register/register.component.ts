import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';
import { RoleService } from 'src/app/services/role-service/role.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit{
  errorMessage: string = '';
  roles: any = [];
  roles_keys: any = [];
  isNew: boolean = true;
  status: any;
  isVisible: boolean = false;
  userRoles: any;
  userRoles_keys: any = [];
  userName: any;
  userEmail: any;
  userId: any;

  constructor(private authService: AuthService, private roleService: RoleService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute){}

  protected registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    rolesSelected: new FormControl([], [Validators.required]) // Campo para armazenar as opções selecionadas
  });

  ngOnInit(): void{
    const isOnRegister = this.router.url.toString().includes('/register') || this.router.url.toString().includes('/createuser');
    //console.log("createuser :", this.router.url.toString().includes('/createuser'));
    this.isNew = isOnRegister;
    this.roleService.getRoleListOptions().subscribe(data => {
      this.roles = data;
      console.log("minhas options :", this.roles);
    });

    if(!this.isNew){
      this.userId = this.activatedRoute.snapshot.params['id'];
      //const teste = this.roles.name.includes(this.userRoles);
      //console.log("estou na edição de user", teste);

        this.userService.getUserRoles(this.userId).subscribe(data => {
        this.userRoles = data.userRoles;
        this.userName  = data.user.name;
        this.userEmail = data.user.email;
        this.roles_keys = this.roles.map((value: any) => value.name); //possso descartar essa linha
        this.userRoles_keys = this.userRoles.map((value: any) => value.name);


        //para a edição
        this.registerForm.patchValue({
          name: this.userName,
          email: this.userEmail,
          rolesSelected: this.userRoles_keys //this.userRoles_values //.map((key: any) => this.userRoles_keys[key])
        });

        //console.log(data);
      });
    }
  }

  onSubmit(){
    if(this.isNew)
    {
      if(!this.registerForm.value.password){
        this.errorMessage = "campo senha não preenchido";
      }
      if(this.registerForm.valid){
          console.log("form recebido :", this.registerForm.value);
          this.authService.register(this.registerForm.value).subscribe({
              next:(response: any) => {             
                console.log("resposta do cadastro : ",response);
                this.router.navigate(['/users']);
              },
              error: () => {
                this.errorMessage = 'Não foi possível realizar o cadastro.';
              }
          });
        }
      }else if(!this.isNew){
        console.log(this.registerForm.value);
        if(this.userId !== null){
         if(this.registerForm.valid){
          console.log("entrei no onsubmit update");
            this.isNew = false;
            console.log("valor do formulário :", );
            console.log("valor do formulário :", this.registerForm.value);
            this.userService.updateUser(this.userId, this.registerForm.value).subscribe((response) => {
              //this.status = response.message;
              console.log("resposta do update ", response);
              this.router.navigate(['/users']);
            });
          }
        }
      }
  }

  closeDiv() {
    this.isVisible = false;
  }



}
