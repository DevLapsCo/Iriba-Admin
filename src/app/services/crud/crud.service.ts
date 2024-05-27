import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { API_BASE_URL, QuestionArray, QuestionData } from '../../constants';
import { Observable, forkJoin, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http :  HttpClient, private auth : AuthService) { }

 
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}` // Use "Bearer" for Bearer tokens or other schemes as needed
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Updated signature
  }

  AddQuestion(Question: QuestionData){
    return this.http.post(API_BASE_URL + '/api/v1/questions-answers/add-new-questions', Question, {headers: this.createHeaders()});
  }

  sendBulkRequests(dataArray: any[]) {
      return this.http.post(API_BASE_URL + '/api/v1/questions-answers/add-bulk-questions', dataArray, { headers: this.createHeaders() });
  }

  getAllQuestionOfQuestion(id : string) {
    return this.http.post(API_BASE_URL + '/api/v1/questions-answers/get-all-question-array', id, {headers : this.createHeaders()});
  }

}
