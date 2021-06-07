import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { SET_NAME } from '../../actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  studentsUrl = "https://student-portal-server.herokuapp.com/student";
  // studentsUrl = "http://localhost:5000/student";
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  loginUser(email: string, password: string): Observable<any>{
    return this.http.post<any>(this.studentsUrl+'/login', {"userName": email, "password": password}, this.httpOptions)
    .pipe(
      tap((res) => {
        if(res.success == true){
          sessionStorage.setItem('loggedIn', "true");
          sessionStorage.setItem('loginName', res.name);
          this.ngRedux.dispatch({type: SET_NAME, name: res.name});
        }
        console.log(`Login verification successful`);
      }),
      catchError(this.handleError<any>('loginUser'))
    );
  }

  logoutUser(){
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('loginName');
  }

  isUserLoggedIn(): boolean{
    let loginValue = sessionStorage.getItem('loggedIn');
    if(loginValue == "true"){
      this.ngRedux.dispatch({type: SET_NAME, name: sessionStorage.getItem('loginName')});
      return true;
    }
    else{
      return false;
    }
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
