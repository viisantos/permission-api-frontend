import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role-service/role.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit{
  users: any[] = [];
  status: string = '';
  isVisible: boolean = false; 

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
        this.users = data;
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => Number(user.id) !== id);
    });
  }

  closeDiv(){
    this.isVisible = false;
  }

}
