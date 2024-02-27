import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { canActivateRouteGuard } from './can-activate-route.guard';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'todolist',component:TodoListComponent,canActivate:[canActivateRouteGuard]},
    {path:'todoform',component:TodoFormComponent,canActivate:[canActivateRouteGuard]},
    {path:'contact',component:ContactUsComponent}
];
