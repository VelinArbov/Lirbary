import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  users: any;
  baseUrl = "https://localhost:5001/api/v1/";
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User)=> {
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'books/id',model).pipe(
      map((user : User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
    
  }

  getUsers(){
    this.http.get(this.baseUrl +'users').subscribe(response => {
      console.log(response);
      this.users = response;
    },error=> {
      console.log(error);
    })
  }
  

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  
}
