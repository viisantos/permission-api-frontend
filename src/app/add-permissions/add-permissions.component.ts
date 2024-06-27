
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../services/role-service/role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-permissions',
  standalone: false,
  templateUrl: './add-permissions.component.html',
  styleUrl: './add-permissions.component.css'
})
export class AddPermissionsComponent implements OnInit{
[x: string]: any;
  status: any = '';
  role_permissions: any[] = [];
  permissions: any[] = [];
  isVisible: boolean = false;
  roles_and_permissions_data: any = [];
  role_permissions_aux: any;

  constructor(private roleService: RoleService, private router: Router,  private route: ActivatedRoute){}

  protected role_permissions_form = new FormGroup({
    permissionsSelected: new FormControl(<any>[], [Validators.required]),
  });

  ngOnInit(): void {
    const roleId = this.route.snapshot.params['id'];
    this.roleService.getRolePermissions(roleId).subscribe(data => {
      this.roles_and_permissions_data = data;
      this.role_permissions = data.rolePermissions;
      this.permissions = data.permissions;
      this.role_permissions_aux = this.role_permissions;
      console.log("tudo o que vem do back ", this.roles_and_permissions_data);
      
      this.role_permissions_form.patchValue({
        permissionsSelected: this.role_permissions,
      });

      console.log("permissions selected : ", this.role_permissions_form.value);
    });
  }

  onSubmit():void {
    const roleId = this.route.snapshot.params['id'];
    console.log(this.role_permissions_form.value);
    if(this.role_permissions_form.valid){
        this.roleService.givePermissionsToRole(roleId, this.role_permissions_form.value).subscribe((response: any) => {
        //this.status = response.status;
        console.log("resultado backend : ", response);
      });
    }
  }

  closeDiv(){
    this.isVisible = false;
  }
}
