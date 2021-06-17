import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  name: string = "";
  password: string = "";
  remember: boolean = false;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onSubmit(){
    this.name = this.loginForm.value.name.trim();
    this.password = this.loginForm.value.password.trim();
    this.remember = this.loginForm.value.remember;
    this.loader = true;
    this.loginService.loginUser(this.name, this.password, this.remember)
      .subscribe((res) => {
        if(res.success == true){
          console.log("Login Successfull");
          this.loader = false;
          this.router.navigate(["students"]);
        }
        else{
          this.loader = false;
          console.log("Login failed");
        }
      })
  }

}
