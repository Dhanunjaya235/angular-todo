import { Component, OnInit } from '@angular/core';
import { TodoInterface } from '../models';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoList: TodoInterface[] = [];

  constructor(private apiService: ApiService) {}

  async fetchTodosOfUser() {
    await this.apiService
      .GET(`todos/user`)
      .then((response) => {
        this.todoList = response.data;
      })
      .catch((error) => {
        this.todoList = [];
      });
  }

  async ngOnInit() {
    await this.fetchTodosOfUser();
  }
}
