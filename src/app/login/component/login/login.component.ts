import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { LoginService } from 'src/app/service/login.service';
import { PersonalService } from 'src/app/service/personal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnDestroy{
  constructor(
    private personalService: PersonalService,
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
  private subject$ = new Subject();

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
    this.personalService.allPersonal();
    
    console.log(this.form.value);

    this.personalService.personals$.pipe(takeUntil(this.subject$)).subscribe((employeeList) => {
      const logedIn = employeeList.find(
        (data: any) =>
          data.email === this.form.value.email &&
          data.id === this.form.value.password
      );
      if (logedIn) {
        this.loginService.postLogin(this.form.value).pipe(takeUntil(this.subject$)).subscribe();
        localStorage.setItem('employeeIsLogd', JSON.stringify(this.form.value));
        this.router.navigate(['employee']);
      } else {
        this.alertText = `Login failed the email or password is incorrect !`;
        this.loginWasWrong = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
