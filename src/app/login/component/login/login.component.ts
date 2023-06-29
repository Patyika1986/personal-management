import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/service/login.service';
import { PersonalApiService } from 'src/app/service/personal/personalApi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private personalService: PersonalApiService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  public form = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(35),
        Validators.required,
        Validators.email,
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.required,
      ]),
    ],
    rememberMe: [''],
  });

  public alertText: string = '';
  public loginWasWrong: boolean = false;
  private allEmployees: any[] = [];

  /**
   * switch dark and light mode
   * @param {Event} event
   */
  lightMode(event: any) {
    document.documentElement.setAttribute(
      'data-theme',
      event.target.checked ? 'dark' : 'light'
    );
  }

  rememberEmployeLogin(event: any) {
    this.form.controls.rememberMe.setValue(event.target.checked);
  }

  //  wenn man nicht remember me aus wählt dann postet nicht !
  login() {
    console.log(this.form.value);

    this.personalService.getPersonal().subscribe((employeeList) => {
      const logedIn = employeeList.find(
        (data: any) =>
          data.email === this.form.value.email &&
          data.id === this.form.value.password
      );
      if (logedIn) {
        this.loginService.postLogin(this.form.value).subscribe();
        localStorage.setItem('employeeIsLogd', JSON.stringify(this.form.value));
        this.router.navigate(['employee']);
      } else {
        this.alertText = `Login failed the email or password is incorrect !`;
        this.loginWasWrong = true;
      }
    });

    // this.loginService.getLogedEmployees().subscribe((data) => {
    //   this.personalService.getPersonal().subscribe((list) => {
    //     for (let i = 0; i < list.length; i++) {
    //       if (
    //         list[i].email == this.form.value.email &&
    //         list[i].id == this.form.value.password
    //       ) {

    //         this.loginService.postLogin(this.form.value).subscribe();
    //         this.router.navigate(['employee']);

    //         return;
    //       }
    //     }
    //     this.alertText = `Login failed the email or password is incorrect !`;
    //     this.loginWasWrong = true;
    //   });
    // });
  }
}
