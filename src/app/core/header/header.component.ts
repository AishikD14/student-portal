import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName! : string;
  notLoginPage: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getName();
  }

  getName(){
    this.userName = sessionStorage.getItem('loginName');
  }

  logout(){
    this.loginService.logoutUser();
    this.router.navigate(['login']);
  }

}
