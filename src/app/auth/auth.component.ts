import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;

  constructor(private authService: AuthService) {
  }

  onClickSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    // (<FormArray>this.authForm.get('password')).push( new FormGroup({
    //   'password_confirm': new FormControl(null, [Validators.required, Validators.min(3), Validators.max(25)])
    // }))
  }

  initForm() {
    let emailPlaceholder = '';

    this.authForm = new FormGroup({
      'email': new FormControl(emailPlaceholder, [Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (!this.authForm.valid) return;
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];
    this.isLoading = true;
    if (this.isLoginMode) {

    } else {
      this.authService.signUp(email, password).subscribe(response => {
        this.isLoading = false;

      }, error => {
        this.isLoading = false;
        this.error = 'An error occured.'
      }, () => {
      });
    }
    this.authForm.reset();
  }
}
