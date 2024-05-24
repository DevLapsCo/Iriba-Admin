import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  OAuthLogin(){
    return this.http.get(API_BASE_URL + '/api/v1/auth/login/oauth/google');
  }

}
