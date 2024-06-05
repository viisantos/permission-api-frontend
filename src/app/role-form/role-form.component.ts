import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/role-service/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent implements OnInit{
  role: any = {};
  isNew: boolean = true;

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void{
    const roleId = this.route.snapshot.params['id'];
    if(roleId){
      this.isNew = false;
      this.roleService.getRole(roleId).subscribe(data => {
        this.role = data;
      });
    }
  }
}
