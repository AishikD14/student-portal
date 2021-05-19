import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  newStudent: any = {};
  profileForm: any;

  constructor(
    private studentService: StudentService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      school: ['', Validators.required],
      subject: ['', Validators.required],
      score: ['', Validators.required]
    });
  }

  onSubmit(){
    this.newStudent["name"] = this.profileForm.value.name.trim();
    this.newStudent["address"] = this.profileForm.value.address.trim();
    this.newStudent["school"] = this.profileForm.value.school.trim();
    this.newStudent["subject"] = this.profileForm.value.subject.trim();
    this.newStudent["score"] = this.profileForm.value.score;
    this.studentService.addStudent(this.newStudent as Student)
      .subscribe(_ => {
        this.location.back();
      });
  }

  goBack(){
    this.location.back();
  }

}
