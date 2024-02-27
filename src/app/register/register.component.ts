import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToasterService } from '../toaster.service';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { UserInterface } from '../models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,GoogleSigninButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registrationFrom!: FormGroup;
  constructor(private formBuilder: FormBuilder, private apiWrapper: ApiService, private toaster: ToasterService,private authService:SocialAuthService) { }

  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  };

  ngOnInit(): void {
    this.registrationFrom = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required,])]
    }, { validator: this.passwordMatchValidator })

    this.authService.authState.subscribe(async (user) => {
      await this.onSubmit(user);
    })
  }

  validatePasswordAndConfirmPassword() {
    if (!(this.registrationFrom.get('password')?.value === this.registrationFrom.get('confirmPassword')?.value)) {
      this.registrationFrom.setErrors({ 'passwordMismatch': true });
    }
  }

  validateNames(field: string) {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const value: string = (this.registrationFrom.get(field)?.value ?? '') as string;
    if (specialChars.test(value)) {
      this.registrationFrom.setErrors({ [`${field}Mismatch`]: true });
    } else {
      this.registrationFrom.setErrors({ [`${field}Mismatch`]: false });
    }
  }


  async onSubmit(data?:UserInterface) {
    await this.apiWrapper.POST('/users/register', { ...(data ? data : this.registrationFrom.value) }).then((result) => {
      if (result.data.acknowledged) {
        this.toaster.successToaster('Registered Successfully', 'Success');
        this.registrationFrom.reset();
      }
    }).catch((error) => {
      this.toaster.errorToaster(error.data.error)
    })
  }
}
