import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role-service/role.service';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
    roles: any[] = [];

    constructor(private roleService: RoleService){}

    ngOnInit(): void {
      this.roleService.getRoles().subscribe(data => {
        this.roles = data;
        console.log(data);
      });
      
    }

    deleteRole(id: number): void{
      this.roleService.deleteRole(id).subscribe(() => {
        this.roles = this.roles.filter(role => role.id !== id);
      });
    }


}
