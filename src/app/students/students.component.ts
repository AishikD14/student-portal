import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentsComponent implements OnInit {
  students: Student[];
  displayedColumns: string[] = ['id', 'name', 'address', 'school', 'subject', 'score'];
  dataSource: any;
  expandedElement: Student | null;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => { 
      this.students = students; 
      this.dataSource = new MatTableDataSource(this.students);
    });
  }

  delete(student: Student){
    this.studentService.deleteStudent(student.id)
    .subscribe(_ => {
      this.students = this.students.filter(h => h !== student);
      this.dataSource = new MatTableDataSource(this.students);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
  }

}
