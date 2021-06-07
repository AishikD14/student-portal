import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../store';
import { SET_COUNT } from '../../actions';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @select() name;
  @select() count;

  userName! : string;
  notLoginPage: boolean = true;

  constructor(
    private loginService: LoginService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit(): void {
    this.getName();
    this.getCount();
  }

  getName(){
    this.userName = sessionStorage.getItem('loginName');
  }

  getCount(){
    this.studentService.getStudents()
      .subscribe((res) => {
        this.ngRedux.dispatch({type: SET_COUNT, count: res.length});
      })
  }

  logout(){
    this.loginService.logoutUser();
    this.router.navigate(['login']);
  }

}
