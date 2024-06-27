import { PermissionService } from './../services/permission-service/permission.service';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-role-form',
  templateUrl: './permission-form.component.html',
  styleUrl: './permission-form.component.css'
})
export class PermissionFormComponent implements OnInit{
  permission: any = {};
  isNew: boolean = true;
  status: string = '';
  isVisible: boolean = false;

  constructor(
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  protected permissionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void{
    const permissionId = this.route.snapshot.params['id'];
    if(permissionId){
      this.isNew = false;
      this.permissionService.getPermission(permissionId).subscribe(data => {
        this.permission = data.name;
      });
    }
  }

  onSubmit(): void {
    if(this.isNew){
      if(this.permissionForm.valid){
        this.permissionService.createPermission(this.permissionForm.value).subscribe((response) => {
        this.status = response.message;
        this.isVisible = true;
        this.router.navigate(['/permissions']);
      });
    }
    }else{
      const permissionId = Number(this.route.snapshot.params['id']);
      if(permissionId){
        if(this.permissionForm.valid){
          this.permissionService.updatePermission(permissionId, this.permissionForm.value).subscribe((response) => {
            console.log(response);
            this.status = response.message;
            this.isVisible = true;
            this.router.navigate(['/permissions']);
          });
        }
      }
    }
  }

  closeDiv() {
    this.isVisible = false;
  }
}
