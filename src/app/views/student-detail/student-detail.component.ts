import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../student';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  student: Student;
  profileForm: any;
  

  constructor(
    private route: ActivatedRoute,
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
    this.getStudent();
  }

  getStudent(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudent(id)
      .subscribe(student => {
        this.student = student;
        this.profileForm.setValue({
          name: student.name,
          address: student.address,
          school: student.school,
          subject: student.subject,
          score: student.score
        })
      });
  }

  onSubmit(){
    this.student.name = this.profileForm.value.name.trim();
    this.student.address = this.profileForm.value.address.trim();
    this.student.school = this.profileForm.value.school.trim();
    this.student.subject = this.profileForm.value.subject.trim();
    this.student.score = this.profileForm.value.score;
    this.studentService.updateStudent(this.student)
    .subscribe(_ => {
      this.goBack();
    });
  }

  goBack(){
    console.log("hi");
    this.location.back();
  }

}
