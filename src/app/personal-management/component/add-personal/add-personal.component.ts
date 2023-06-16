import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Personals } from 'src/app/Personal-Module/personals';
import { PersonalService } from 'src/app/service/personal/personal.service';
@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss']
})
export class AddPersonalComponent implements OnInit{

  constructor(public formsBuilder:FormBuilder, public personalServiace: PersonalService){}

  public form = this.formsBuilder.group({
    firstName: ['', Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
    lastName: ['', Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
    email: ['', Validators.compose([Validators.required,Validators.email])],
    tel: ['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(14)])],
    id:['']
  });





  ngOnInit(): void {

  }

  addNewEmploye(){
    if(this.form.status === "VALID"){
      this.personalServiace.addPersonal(this.form.value).subscribe((allPersonals) => {
        console.log(allPersonals,'post');
      })
    }
  }


  resetForm(){
    this.form.reset();
  }



}
