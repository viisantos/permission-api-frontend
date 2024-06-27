import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../services/permission-service/permission.service';

@Component({
  selector: 'app-permission',
  standalone: false,
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent implements OnInit{
  permissions: any[] = [];
  status: string = '';
  isVisible: boolean = false; 

  constructor(private permissionService: PermissionService){}

  ngOnInit(): void {
    this.permissionService.getPermissions().subscribe(data => {
        this.permissions = data;
    });
  }

  deletePermission(id: number): void {
    this.permissionService.deletePermission(id).subscribe((response: any) => {
      this.status = response.message;
      this.isVisible = true;
      this.permissions = this.permissions.filter(permission => Number(permission.id) !== id);
    });
  }

  closeDiv(){
    this.isVisible = false;
  }

}
