import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth : AuthService){}

  redirectUri! :string ;

  GoogleOAuthRedirect(){
    this.auth.OAuthLogin().subscribe({
      next: (n:any) => {
        this.redirectUri = n.redirecturi;
        console.log(n)
      },
      complete: () => {
        window.location.href = this.redirectUri;
      }
    })
  }
}
