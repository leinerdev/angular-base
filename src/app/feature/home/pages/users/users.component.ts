import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    // Numero random entre 1 y 2
    const randomPage = Math.floor(Math.random() * 2) + 1;
    this.http
      .get<UsersResponse>(`https://reqres.in/api/users?page=${randomPage}`)
      .subscribe(res => {
        this.users = res.data;
      });
  }
}
