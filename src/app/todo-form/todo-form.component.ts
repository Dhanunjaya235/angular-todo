import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { TodosService } from '../services/todos.service';
import { TodoInterface } from '../models';
import { TimePickerModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TimePickerModule, InputsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  host: {
    ngSkipHydration: '',
  },
})
export class TodoFormComponent implements OnInit {
  todoform!: FormGroup;

  formData!: TodoInterface | undefined;

  isEdit = new URLSearchParams(window.location.search).get('edit') ?? '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private toaster: ToasterService,
    private todoService: TodosService,
    private router: Router,
    public voiceService: VoiceRecognitionService
  ) {}
  async ngOnInit() {
    this.formData = this.isEdit ? this.todoService.getFormData() : undefined;
    console.log(
      this.voiceService.getIsNaviagetdUsingVoice(),
      'isNavigatedUsingVoice'
    );
    if (this.voiceService.getIsNaviagetdUsingVoice()) {
      this.voiceService.init();
      this.voiceService.start();
      this.voiceService.setCallback(() => {
        if (this.voiceService.text) {
          console.log('todo form component', this.voiceService.text);
          const command = this.voiceService.text.trim();
          const words = command.split(' ');
          const formFields = ['title', 'note', 'statue', 'due date', 'duedate'];
          if (command.startsWith('set') || command.startsWith('value')) {
            const field = words[1];
            const value = words[2];
            console.log(field, 'field');
            console.log(value, 'value');
            this.todoform.reset({
              ...this.todoform.value,
              [field]: value,
            });
          } else if (formFields.includes(words[0])) {
            const field = words[0];
            const value = words[1];
            console.log(field, 'field');
            console.log(value, 'value');
            this.todoform.reset({
              ...this.todoform.value,
              [field]: value,
            });
          }
        }
      });
    }
    if (this.isEdit && !this.formData) {
      this.router.navigate(['/todoform']);
    }
    this.todoform = this.formBuilder.group({
      title: [this.formData?.title ?? '', Validators.required],
      note: [this.formData?.note ?? '', Validators.required],
      duedate: [this.formData?.duedate ?? '', Validators.required],
      status: [this.formData?.status ?? 'New', Validators.required],
    });
  }

  handleReset() {
    this.todoform.reset({
      title: this.formData?.title ?? '',
      note: this.formData?.note ?? '',
      status: this.formData?.status ?? 'New',
      duedate: this.formData?.duedate ?? '',
    });
  }

  async handleSave() {
    if (this.formData) {
      const data = {
        ...this.todoform.value,
        email: this.userService.getUsername(),
      };
      await this.apiService
        .PATCH(`/todos/${this.formData._id}`, data)
        .then((response) => {
          this.toaster.successToaster(
            'Todo Edited Successfully.Navigating to list view'
          );
          this.todoform.reset();
          this.router.navigate(['/todolist']);
        })
        .catch((error) => {
          this.toaster.errorToaster('An Error Occured');
        });
      return;
    }
    const data = {
      ...this.todoform.value,
      email: this.userService.getUsername(),
    };
    await this.apiService
      .POST('/todos', data)
      .then((response) => {
        this.toaster.successToaster(
          'Todo Created Successfully..Navigating to list view'
        );
        this.todoform.reset();
        this.router.navigate(['/todolist']);
      })
      .catch((error) => {
        this.toaster.errorToaster('An Error Occured');
      });
  }
}
