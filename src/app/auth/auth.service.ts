import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponseData {
  message: string;
  email: string;
  _id: string
  token: string;
  role: number
  iat: number;
  exp: number;
}

interface AuthRequestBodyPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  signUp(email: string, password: string) {
    const url = `${environment.API_URL}users/signup`;

    return this.http.post<AuthResponseData>(url, {
        email: email,
        password: password
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
          // this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
      )
  }

  login(email: string, password: string) {
    const url = `${environment.API_URL}users/login`;

    return this.http.post<AuthResponseData>(url, {
      email: email,
      password: password
    })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData._id, resData.token, resData.role, resData.iat, resData.exp);
        })
      )
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (!loadedUser.token) return;

    this.user.next(loadedUser);
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    // localStorage.clear();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) return throwError(errorMessage);

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Authentication attempt failed';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email, _id, token, role, iat, exp) {
    const expirationDate = new Date(exp * 1000)
    const user = new User(email, _id, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout((exp - iat) * 1000);
  }
}
