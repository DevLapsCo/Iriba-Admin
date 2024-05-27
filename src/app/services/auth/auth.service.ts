import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL, AuthenticatedUser, CallBackRequest } from './../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  OAuthLogin(){
    return this.http.get(API_BASE_URL + '/api/v1/auth/login/oauth/google');
  }

  googleCallBackRequest(formData : CallBackRequest){
    return this.http.post<any>(`${API_BASE_URL}/api/v1/auth/auth/callback`, formData);
  }

  // Sessions Service

  saveUserAndToken(user: AuthenticatedUser, token: string): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    sessionStorage.setItem('token', token);
  }
 
  saveDataToSession(DataName: string, data: Object): void {
    sessionStorage.setItem(DataName, JSON.stringify(data));
  }

  getUser(): AuthenticatedUser | null {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
 
  getQuestionId(): any {
    const QuestionDetails = sessionStorage.getItem('question_details');
    return QuestionDetails ? JSON.parse(QuestionDetails) : null;
  }

  clearSession(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
  }
}
