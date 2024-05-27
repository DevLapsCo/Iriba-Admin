
export const API_BASE_URL = 'http://localhost:4008';

export interface CallBackRequest {
    code: string;
    registrationId : string
}


export interface AuthenticatedUser {
    id: string;
    name: string;
    email: string;
    roles: string;
  }

  export interface AccessToken {
    email : string;
    code : string
  }
  export interface QuestionData {
    about : string;
    created_by : string;
  }

  export interface QuestionArray{
    id: string;
    question : string
    questionId : string
  }