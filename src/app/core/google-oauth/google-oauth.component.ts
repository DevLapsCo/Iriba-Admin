import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CallBackRequest } from '../../constants';

@Component({
  selector: 'app-google-oauth',
  standalone: true,
  imports: [],
  templateUrl: './google-oauth.component.html',
  styleUrl: './google-oauth.component.css'
})
export class GoogleOauthComponent implements OnInit{

  constructor(private auth : AuthService, private route : ActivatedRoute, private router : Router){}

  paramsData! : CallBackRequest;

  ngOnInit(): void {  
  // get params for callback
    this.getParams();

    // Assuming getParams ensures paramsData.code and paramsData.registrationId are not null
  this.auth.googleCallBackRequest({
    code: this.paramsData.code,
    registrationId: this.paramsData.registrationId
  }).subscribe({
    next: (n:any) => {
      console.log(n);
      this.auth.saveUserAndToken(n.user, n.token);
    },
    error: (e) => {
      console.log(e);
    },
    complete: () => {
      this.router.navigate(['../questions-publish']);
    }
    });
  }

  getParams() {
    const code = this.route.snapshot.queryParamMap.get('code');
    const registrationId = this.route.snapshot.queryParamMap.get('registrationId');

    // Handling potential null values with a fallback or error handling:
    if (code === null || registrationId === null) {
        console.error("OAuth parameters missing in the URL.");
        this.paramsData = { code: '', registrationId: '' }; // Providing a fallback or consider error handling
        // Alternatively, handle this condition differently, e.g., show an error message or redirect.
    } else {
       this.paramsData = { code, registrationId };
    }
}
}
