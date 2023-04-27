import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  storeDate(event: MatDatepickerInputEvent<Date>) {
    this.userData.birthday = `${event.value}`;
  }

  /**
   * send the form inputs to the backend
   * @function onSubmit
   */

  onSubmit(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        if (response.success === true) {
          this.dialogRef.close();
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
}
