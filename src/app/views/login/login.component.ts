import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  credentials: any = {};
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.credentials["name"] = this.loginForm.value.name.trim();
    this.credentials["password"] = this.loginForm.value.password.trim();
    console.log(this.credentials);
    // this.loader = true;
    // this.loginService.addStudent(this.newStudent as Student)
    //   .subscribe(_ => {
    //     this.loader = false;
    //     this.location.back();
    //   });
  }

}
