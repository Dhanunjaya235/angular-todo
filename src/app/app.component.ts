import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { ToasterService } from './services/toaster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public userService: UserService,
    private toaster: ToasterService,
    private router: Router
  ) {}

  title = 'ToDo Application';
  links = [
    { title: 'Home', link: '/home' },
    { title: 'My ToDo List', link: '/todolist' },
    { title: 'Add A New ToDo', link: '/todoform' },
    { title: 'Refer A Friend', link: '/register' },
    { title: 'About', link: '/about' },
    { title: 'Contact-Us', link: '/contact' },
  ];

  handleLogout() {
    localStorage.removeItem('accessToken');
    this.userService.setJWTToken('');
    this.userService.setUsername('');
    this.toaster.successToaster('Logged Out Successfully');
    this.router.navigate(['/home']);
  }
}
