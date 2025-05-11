import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private _snackBar = inject(MatSnackBar);

  constructor(private _router: Router, private _loginService: LoginService) { }

  public onSubmit(): void {
    if (!this.email || !this.password) {
      this._snackBar.open('Lütfen kullanıcı adı ve şifre giriniz!', 'OK', {
        duration: 3000
      });
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
          localStorage.setItem('token', response.data['message']);
          this._router.navigate(['/home']);
        } else {
          console.error('Login failed:', response.errorMessage);
          this._loginService.canActivate = false;
          this._snackBar.open(response.errorMessage, 'OK', {
            duration: 3000
          });
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this._loginService.canActivate = false;
        this._snackBar.open('Giriş başarısız, lütfen tekrar deneyiniz!', 'OK', {
          duration: 3000
        });
      }
    );
  }
}
