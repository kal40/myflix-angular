import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  @Input() userData = {
    username: '',
    password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {});
  }

  onSubmit(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        if (response.success === true) {
          this.snackBar.open(response.message, 'OK', {
            duration: 8000,
          });
          localStorage.setItem('user', this.userData.username);
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['movies']);
        }
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 8000,
        });
      }
    );
  }
}
