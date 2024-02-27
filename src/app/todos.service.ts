import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { TodoInterface } from './models';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private formData!:TodoInterface;

  getFormData(){
    return this.formData;
  }

  setFormData(data:TodoInterface){
    this.formData=data;
  }
}
