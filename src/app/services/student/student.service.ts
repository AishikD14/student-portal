import { Injectable } from '@angular/core';
import { Student } from '../../student';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // studentsUrl = "https://student-portal-server.herokuapp.com/student";
  studentsUrl = "http://localhost:5000/student";
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization' : "Basic " + btoa('admin:admin')
    })
  };

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentsUrl, this.httpOptions)
    .pipe(
      tap((val) => console.log("Fetched Students successfully")),
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  }

  getStudent(id: number): Observable<Student>{
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url, this.httpOptions)
    .pipe(
      tap(_ => console.log("Fetched Student successfully")),
      catchError(this.handleError<Student>(`getStudent id = ${id}`))
    );
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.post(this.studentsUrl+'/update', student, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  deleteStudent(id: number): Observable<any> {
    const url = `${this.studentsUrl}/delete/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted student id=${id}`)),
      catchError(this.handleError<any>('deleteStudent'))
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl+'/add', student, this.httpOptions).pipe(
      tap((newStudent: Student) => console.log(`added student w/ id=${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
