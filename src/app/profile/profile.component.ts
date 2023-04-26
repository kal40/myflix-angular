import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getUser();
    } else {
      this.router.navigate(['welcome']);
    }
  }

  storeDate(event: MatDatepickerInputEvent<Date>) {
    this.userData.birthday = `${event.value}`;
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.userData = response.data;
      console.log(this.userData);
      return this.userData;
    });
  }

  onSubmit(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (response) => {
        if (response.success === true) {
          localStorage.setItem('user', response.data.username);
          this.snackBar.open(response.message, 'OK', {
            duration: 8000,
          });
        }
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 8000,
        });
      }
    );
  }

  onDelete(): void {
    this.fetchApiData.deleteUser().subscribe(
      (response) => {
        if (response.success === true) {
          this.snackBar.open(response.message, 'OK', {
            duration: 8000,
          });
          localStorage.clear();
          this.router.navigate(['welcome']);
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
