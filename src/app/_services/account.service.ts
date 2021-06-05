import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
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
  loggedIn = false;
  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User )=> {
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
          this.loggedIn = true;
          console.log(this.currentUser$);
        }
      })
    )
  }

  register(model: any) {
    console.log(model);
    return this.http.post(this.baseUrl + 'account/register',model).pipe(
      map((user : User) => {
        if(user){
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
        }
        // this.router.navigateByUrl("/");
      })
    )
    
  }

  // getUsers(){
  //   this.http.get(this.baseUrl +'users').subscribe(response => {
  //     console.log(response);
  //     this.users = response;
  //   },error=> {
  //     console.log(error);
  //   })
  // }
  

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  
}
