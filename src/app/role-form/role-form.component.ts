import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/role-service/role.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent implements OnInit{
  role: any = {};
  isNew: boolean = true;
  status: string = '';
  isVisible: boolean = false;

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  protected roleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void{
    const roleId = this.route.snapshot.params['id'];
    if(roleId){
      this.isNew = false;
      this.roleService.getRole(roleId).subscribe(data => {
        this.role = data.name;
      });
    }
  }

  onSubmit(): void {
    if(this.isNew){
      if(this.roleForm.valid){
        this.roleService.createRole(this.roleForm.value).subscribe((response) => {
        this.status = response.message;
        this.router.navigate(['/roles']);
      });
    }
    }else{
      const roleId = Number(this.route.snapshot.params['id']);
      if(roleId){
        if(this.roleForm.valid){
          this.roleService.updateRole(roleId, this.roleForm.value).subscribe((response) => {
            console.log(response);
            this.status = response.message;
            this.router.navigate(['/roles']);
          });
        }
      }
    }
  }

  closeDiv() {
    this.isVisible = false;
  }
}
