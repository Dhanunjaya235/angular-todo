import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ToasterService } from '../toaster.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { GOOGLE_PROVIDER } from '../contants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBulider: FormBuilder, private apiWrapper: ApiService, private toaster: ToasterService, private userService: UserService, private router: Router, private authService: SocialAuthService) { }
  ngOnInit(): void {
    this.loginForm = this.formBulider.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
    this.authService.authState.subscribe(async (user) => {
      await this.onSubmit(user);
    });
  }

  async onSubmit(data?: any) {
    await this.apiWrapper.POST(`/users/login`, (data ? data : this.loginForm.value))
      .then((response) => {
        if (response.data.provider === GOOGLE_PROVIDER) {
          if (data) {
            this.initializeUser(response)
          } else {
            this.toaster.warningToaster('User Registered Using Google. Sign in with Google to continue')
          }
        }
        else if (response.data.password === this.loginForm.value.password) {
          this.initializeUser(response)
        } else {
          this.toaster.errorToaster('Incorrect Password');
        }
      }).catch((error) => {
        console.error(error)
        this.toaster.errorToaster('User Not Registered. Register To Use Application');
      })
  }

  viewOrHidePassword() {
    const element = document.getElementById('password') as HTMLInputElement;
    element.type = element?.type === 'password' ? 'text' : 'password'
  }

  initializeUser(response: any) {
    this.userService.setUsername(response.data.email);
    localStorage.setItem('accessToken', response.data.token);
    this.userService.setJWTToken(response.data.token);
    this.toaster.successToaster('User Logged In Successfully');
    this.router.navigate(['/todolist']);
  }
}
