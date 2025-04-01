import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  cheackUser(username: string, password: string) {
    if (username != "" && password != "") {

      this.http.get(`http://localhost:8080/api/login/check/${username}/${password}`).subscribe(
        respons => {
          if (respons) {
            this.router.navigate(['/dashboard']);
          }
        }, err => {

        }
      );
    }
  }
}
