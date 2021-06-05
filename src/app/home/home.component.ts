import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users : any;
  loggedIn = false;
 

  constructor(public accountService : AccountService) { }

  ngOnInit(): void {
  this.checkLoggedIn();
  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  checkLoggedIn(){
    this.loggedIn = this.accountService.loggedIn;
  }


}
