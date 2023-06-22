import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private personalService:PersonalService,
    private formBuilder:FormBuilder,
    private loginService:LoginService){}


    public form = this.formBuilder.group({
      email:['',Validators.compose([Validators.minLength(6),Validators.maxLength(35),Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10),Validators.required])],
      rememberMe:['']
    })

    public alertText:string = '';
    public loginWasWrong:boolean = false;
    private allEmployees:any[] = [];

  /**
   * switch dark and light mode
   * @param {Event} event
   */
  lightMode(event:any){
    document.documentElement.setAttribute(
      'data-theme',
      event.target.checked ? 'dark' : 'light'
    );    
  }

  rememberEmployeLogin(event:any){
    this.form.controls.rememberMe.setValue(event.target.checked);
    console.log(event.target.checked);
  }

   login(){

    this.personalService.getPersonal().subscribe(list => {
      for(let i = 0; i < list.length; i++){
        if(list[i].email == this.form.value.email && list[i].id == this.form.value.password){
           this.loginService.postLogin(this.form.value).subscribe()
          return
        }
      } 
      this.alertText = `Login failed the email or password is incorrect !`;
      this.loginWasWrong = true;
      
    });
  }

}
