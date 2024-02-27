import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';
import { ToasterService } from '../toaster.service';
import { Router } from '@angular/router';
import { TodosService } from '../todos.service';
import { TodoInterface } from '../models';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  host: {
    'ngSkipHydration': ''
  }
})
export class TodoFormComponent implements OnInit {
  todoform!: FormGroup;

  formData!: TodoInterface | undefined;

  isEdit= new URLSearchParams(window.location.search).get('edit') ?? '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private userService: UserService, private toaster: ToasterService, private todoService: TodosService, private router: Router) { }
  async ngOnInit() {
    this.formData = this.isEdit ? this.todoService.getFormData() : undefined;
    if (this.isEdit && !this.formData) {
      this.router.navigate(['/todoform'])
    }
    this.todoform = this.formBuilder.group({
      title: [this.formData?.title ?? '', Validators.required],
      note: [this.formData?.note ?? '', Validators.required],
      duedate: [this.formData?.duedate ?? '', Validators.required],
      status: [this.formData?.status ?? 'New', Validators.required]
    })
  }

  handleReset() {
    this.todoform.reset({ title: this.formData?.title ?? '', note: this.formData?.note ?? '', status: this.formData?.status ?? 'New', duedate: this.formData?.duedate ?? '' });
  }

  async handleSave() {

    if(this.formData){
      const data = { ...this.todoform.value, email: this.userService.getUsername() }
      await this.apiService.PATCH(`/todos/${this.formData._id}`, data).then((response) => {
        this.toaster.successToaster('Todo Edited Successfully.Navigating to list view');
        this.todoform.reset();
        this.router.navigate(['/todolist'])
      }).catch((error) => {
        this.toaster.errorToaster('An Error Occured')
      })
      return;
    }
    const data = { ...this.todoform.value, email: this.userService.getUsername() }
    await this.apiService.POST('/todos', data).then((response) => {
      this.toaster.successToaster('Todo Created Successfully..Navigating to list view');
      this.todoform.reset();
      this.router.navigate(['/todolist'])
    }).catch((error) => {
      this.toaster.errorToaster('An Error Occured')
    })
  }
}
