import { Component, Input } from '@angular/core';
import { TodoInterface } from '../models';
import { ApiService } from '../api.service';
import { ToasterService } from '../toaster.service';
import { Router } from '@angular/router';
import { TodosService } from '../todos.service';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todoItem!: TodoInterface;
  @Input() fetchTodosOfUser!: () => void;

  constructor(private apiService: ApiService, private toaster: ToasterService, private router: Router, private todoService: TodosService) { }

  async handleDelete(id: string | number,) {
    await this.apiService.DELETE(`todos/${id}`)
      .then(async (response) => {
        this.toaster.successToaster('Todo Deleted Successfully');
        if (this.fetchTodosOfUser) {
          await this.fetchTodosOfUser()
        }
      }).catch((error) => {
        this.toaster.errorToaster('An Error Occured')
      })
  }

  async handleEdit(todoItem: TodoInterface) {
    this.todoService.setFormData(todoItem);
    this.router.navigate(['/todoform'], { queryParams: { edit: true } })
  }
}
