import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role-service/role.service';
import { Injectable } from '@angular/core';
import { RoleFormComponent } from '../role-form/role-form.component';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})

export class RoleComponent implements OnInit {
    roles: any[] = [];
    status: string = '';
    isVisible: boolean = false;

    constructor(private roleService: RoleService,
      private roleformComponent: RoleFormComponent
    ){}

    ngOnInit(): void {
      this.roleService.getRoles().subscribe(data => {
        this.roles = data;
        //console.log(data);
        if(this.roleformComponent.status !== null){
          this.status = this.roleformComponent.status;
          //console.log("após atualização :", this.roleformComponent.status);
        }
      });

    }

    deleteRole(id: number): void{
      this.roleService.deleteRole(id).subscribe((response: any) => {
            this.status = response.message;
            console.log(response);
            this.isVisible = true;
            this.roles = this.roles.filter(role => Number(role.id) !== id);
      });
    }

    closeDiv() {
      this.isVisible = false;
    }


}
