import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { UserModel } from './../models/user.model';
import { AuthenticationResponseModel } from './../models/authenticationResponse.model';

@Injectable()
export class AuthenticationService {

    user = new Subject<UserModel>();
    constructor(private http: HttpClient) {

    }

    signUp(emaila: string, passworda: string) {
        return this.http.post<AuthenticationResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlk95y2XgYQZNqucdHGgpQxIIXSzF6fP8',
            {
                email: emaila,
                password: passworda,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(respData => {
                this.handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
            }));
    }

    signIn(emaila: string, passworda: string) {
        return this.http.post<AuthenticationResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlk95y2XgYQZNqucdHGgpQxIIXSzF6fP8',
            {
                email: emaila,
                password: passworda,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(respData => {
                this.handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
            }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expireIn: string) {

        const expirationDate = new Date(new Date().getTime() + +expireIn * 1000);
        const user = new UserModel(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = 'An unknown error occurred.';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The email/password is invalid.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The email/password is invalid.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
        }
        return throwError(errorMessage);
    }
}

//adding comment
