import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, AuthResponseData} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService,
              private router: Router) {
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

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.error = error;
      }, () => {

      });

    this.authForm.reset();
  }
}
