import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private _router: Router, private _loginService: LoginService) { }

  public onSubmit(): void {
    if (!this.email || !this.password) {
      alert('Lütfen email ve şifre giriniz!');
      return;
    }
    
    const request = {
      username: this.email,
      password: this.password,
    };

    this._loginService.login(request).subscribe(
      (response) => {
        if (response.isSuccess) {
          console.log('Login successful:', response);
          this._loginService.canActivate = true;
          this._router.navigate(['/home']);
        } else {
          console.error('Login failed:', response.errorMessage);
          this._loginService.canActivate = false;
          alert(response.errorMessage);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this._loginService.canActivate = false;
        alert('Giriş başarısız, lütfen tekrar deneyiniz!');
      }
    );
  }
}
