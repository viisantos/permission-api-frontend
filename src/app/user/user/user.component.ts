import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit{
  /*
  users: any[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
        this.users = data;
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }*/
}
