import { Routes } from '@angular/router';
import { QuestionaireComponent } from './questionaire/questionaire.component';
import { LoginComponent } from './core/login/login.component';
import { GoogleOauthComponent } from './core/google-oauth/google-oauth.component';

export const routes: Routes = [
    {
        path : '',
        component: LoginComponent
    },
    {
        path : 'questions-publish',
        component: QuestionaireComponent
    },
    {
        path : 'google-oauth',
        component: GoogleOauthComponent
    }
];
