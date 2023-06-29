import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryCityService } from 'src/app/service/country-city.service';
import { PersonalApiService } from 'src/app/service/personal/personalApi.service';

@Component({
  selector: 'app-add-new-employees',
  templateUrl: './add-new-employees.component.html',
  styleUrls: ['./add-new-employees.component.scss']
})
export class AddNewEmployeesComponent implements OnInit{
  constructor(private formBuilder: FormBuilder,
    private personalApiService: PersonalApiService,
    private countryCityServices: CountryCityService){}

  public red:string = 'red';
  public form = this.formBuilder.group({
    firstName:['',Validators.compose([Validators.minLength(2),Validators.maxLength(15),Validators.required])],
    lastName:['',Validators.compose([Validators.minLength(2),Validators.maxLength(15),Validators.required])],
    dateOfBirth:['',Validators.required],
    street:['',Validators.compose([Validators.minLength(2),Validators.maxLength(25),Validators.required])],
    housNr:['',Validators.required],
    zipCode:['',Validators.compose([Validators.minLength(4),Validators.maxLength(6),Validators.required])],
    city:['',Validators.compose([Validators.minLength(2),Validators.maxLength(25),Validators.required])],
    email:['',Validators.compose([Validators.minLength(6),Validators.maxLength(35),Validators.required,Validators.email])],
    phone:['',Validators.compose([Validators.minLength(4),Validators.maxLength(25),Validators.required])],
    gender:[''],
    img:['',Validators.required],
    placeOfBirth:['',Validators.compose([Validators.minLength(2),Validators.maxLength(25),Validators.required])],
    country:['']
  });


  public imageUrl:string = "./assets/lakatosquadrat.jpg";

  public genders = [
    "Male",
    "Female",
    "Other"
  ];

  public countrys: any;
  public selectedCountry:string = '';
  public selectedGender:string = '';
  public isFormValide: boolean = false;
  public modalText: string = '';
  public isAddSuccessfoly: boolean = true;
  public addIsWrong: boolean = false;

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
    this.selectedGender = gender.value;
  }

  selectCountry(country:any){
    this.selectedCountry = country.value;
  }

  addEmployee(){
    this.form.value.gender = this.selectedGender;
    this.form.value.country = this.selectedCountry;

    if(this.form.status === "VALID"){
      this.personalApiService.addPersonal(this.form.value).subscribe(() => {
        this.modalText = 'Add new employee was successfuly';
      });      
    }else{
      this.isAddSuccessfoly = false;
      this.addIsWrong = true;
      this.modalText = 'Adding new employees was unsuccessful please try hard';
    }
    
    
  }



  resetForm(){
    console.log('reset is runing');
    this.form.reset();
  }
}
