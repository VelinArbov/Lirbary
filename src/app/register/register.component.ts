import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm(){
    this.registerForm= new FormGroup({
      email: new FormControl('',Validators.email),
      password: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      address: new FormGroup({
        country: new FormControl(),
        city: new FormControl(),
        street: new FormControl(),
        streetNumber: new FormControl(),
      }
      )
    })

  }

  matchValues(matchTo:string) : ValidatorFn{
    return(control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMathcing: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      console.log(response);
      this.cancel;
    }, error=> {
      console.log(error);
    })
    
    this.registerForm.controls.password.valueChanges.subscribe(()=> {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
