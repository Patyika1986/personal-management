import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Personals } from 'src/app/Personal-Module/personals';
import { PersonalModule } from 'src/app/service/personal/personal.module';
import { PersonalService } from 'src/app/service/personal/personal.service';
import { CountryCityService } from 'src/app/service/country-city.service';

@Component({
  selector: 'app-personal-overview',
  templateUrl: './personal-overview.component.html',
  styleUrls: ['./personal-overview.component.scss'],
})
export class PersonalOverviewComponent implements OnInit {
  constructor(
    private personalService: PersonalService,
    public formBuilder: FormBuilder,
    public countryCityServices: CountryCityService
  ) {}

  public personals: any[] = [];
  public openEditForm: boolean = false;
  public selectedUser = this.formBuilder.group({
    firstName: [
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ]),
    ],
    lastName: [
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ]),
    ],
    dateOfBirth: ['', Validators.required],
    street: [
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.required,
      ]),
    ],
    housNr: ['', Validators.required],
    zipCode: [
      '',
      Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(6),
        Validators.required,
      ]),
    ],
    city: [
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.required,
      ]),
    ],
    email: [
      '',
      Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(35),
        Validators.required,
        Validators.email,
      ]),
    ],
    phone: [
      '',
      Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(25),
        Validators.required,
      ]),
    ],
    gender: [''],
    img: ['', Validators.required],
    placeOfBirth: [
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.required,
      ]),
    ],
    country: [''],
    id: [''],
  });

  public countrys: any;
  public selectedCountry: string = '';
  public selectedGender: string = '';
  public isFormValide: boolean = false;
  public imageUrl: any = '';

  ngOnInit(): void {
    this.personalService.getPersonal().subscribe((list) => {
      list.map((data: any) => {
        this.selectedUser.controls.id.setValue(data.id);
        this.imageUrl = data.img;
        this.personals.push(data);
      });
    });
  }

  selectImg() {
    // if(file.target.files){
    //   let fileReader = new FileReader();
    //   fileReader.readAsDataURL(file.target.files[0]);
    //   fileReader.onload = (event:any) => {
    //     this.imageUrl = event.target.result;
    //     this.form.value.img = this.imageUrl;
    //     this.selectImg.emit(file);
    //   }
    // }
  }
  selectGender(gender: any) {
    this.selectedGender = gender.value;
  }
  selectCountry() {
    //this.selectedCountry = country.value;
    this.countrys = this.countryCityServices.getCountry();
  }
  details() {}


  /**
   * Save data from form in to database
   *
   * @param {string} id
   */
  editPersonal(id: string) {
    this.openEditForm = true;
    this.personalService.getPersonal().subscribe((data) => {
      const selectedUser = data.find((user: any) => user.id === id);

      if (selectedUser) {
        //save the id from selected employee
        this.personalService.selectedEmployeeId.set(id);

        // set values from form to data
        this.selectedUser.controls.firstName.setValue(selectedUser.firstName);
        this.selectedUser.controls.lastName.setValue(selectedUser.lastName);
        this.selectedUser.controls.dateOfBirth.setValue(
          selectedUser.dateOfBirth
        );
        this.selectedUser.controls.street.setValue(selectedUser.street);
        this.selectedUser.controls.housNr.setValue(selectedUser.housNr);
        this.selectedUser.controls.zipCode.setValue(selectedUser.zipCode);
        this.selectedUser.controls.city.setValue(selectedUser.city);
        this.selectedUser.controls.email.setValue(selectedUser.email);
        this.selectedUser.controls.phone.setValue(selectedUser.phone);
        this.selectedUser.controls.gender.setValue(selectedUser.gender);
        this.selectedUser.controls.placeOfBirth.setValue(
          selectedUser.placeOfBirth
        );
        this.selectedUser.controls.country.setValue(selectedUser.country);
        this.imageUrl = selectedUser.img;
        this.selectedUser.value.img = selectedUser.img;
      }
    });
  }


  /**
   * delete employee
   * find employee with the same id
   * when result true is than
   * don't open modal and delete the employee from firebase
   * find indexOf from result
   * and splice employee withe index from frontend
   * @param {string} id 
   */
  deletePersonal(id: string) {
    const result = this.personals.find(person => person.id === id);
    if(result){
      this.openEditForm = false;
      this.personalService.deletePersonal(id).subscribe();
      this.personals.find(personal => personal.id === id)
      const index = this.personals.indexOf(result);
      this.personals.splice(index,1);
    }
  }
}
