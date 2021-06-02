import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthgaurdService } from './services/authgaurd/authgaurd.service';
import { AddStudentComponent } from './views/add-student/add-student.component';
import { StudentDetailComponent } from './views/student-detail/student-detail.component';
import { StudentsComponent } from './views/students/students.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule) },
  { path: 'students', component: StudentsComponent, canActivate:[AuthgaurdService] },
  { path: 'student-detail/:id', component: StudentDetailComponent, canActivate:[AuthgaurdService] },
  { path: 'add-student', component: AddStudentComponent, canActivate:[AuthgaurdService] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
