import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryCityService } from 'src/app/service/country-city.service';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-add-new-employees',
  templateUrl: './add-new-employees.component.html',
  styleUrls: ['./add-new-employees.component.scss']
})
export class AddNewEmployeesComponent implements OnInit{
  constructor(private formBuilder: FormBuilder,
    private personalService: PersonalService,
    private countryCityServices: CountryCityService){}

  public red:string = 'red';
  public form = this.formBuilder.group({
    firsName:['',Validators.compose([Validators.minLength(3),Validators.maxLength(25),Validators.required])],
    lastName:['',Validators.compose([Validators.minLength(3),Validators.maxLength(25),Validators.required])],
    dateOfBirth:['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(8)])],
    street:['',Validators.compose([Validators.minLength(3),Validators.maxLength(25)])],
    housNr:['',Validators.compose([Validators.minLength(8),Validators.maxLength(8),Validators.required])],
    zipCode:['',Validators.compose([Validators.minLength(4),Validators.maxLength(4),Validators.required])],
    city:['',Validators.compose([Validators.minLength(3),Validators.maxLength(25),Validators.required])],
    email:['',Validators.compose([Validators.minLength(6),Validators.maxLength(35),Validators.email,Validators.required])],
    phone:['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(30)])],
    gender:['',Validators.compose([Validators.required])],
    img:['',Validators.compose([Validators.required])],
    placeOfBirth:['']
  });


  public imageUrl:string = "./assets/lakatosquadrat.jpg";

  public genders = [
    "Male",
    "Female",
    "Other"
  ];

  public countrys: any;




  ngOnInit(): void {
    this.countrys = this.countryCityServices.getCountry();
      
  }

  onSelectImageFile(file:any){
    if(file.target.files){
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file.target.files[0]);
      fileReader.onload = (event:any) => {
        this.imageUrl = event.target.result;
        this.form.value.img = this.imageUrl;
      }
    }
  }

  selectGender(gender:any){
    this.form.value.gender = gender.value;
  }



  selectCountry(country:any){
    console.log(country.value,'country');
  }





  addEmployee(){
    console.log(this.form.value);
    
  }



  resetForm(){
    console.log('reset is runing');
    this.form.reset();
  }
}
