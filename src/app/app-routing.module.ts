import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './views/add-student/add-student.component';
import { StudentDetailComponent } from './views/student-detail/student-detail.component';
import { StudentsComponent } from './views/students/students.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'student-detail/:id', component: StudentDetailComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'login', loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
