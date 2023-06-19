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
  });

  public countrys: any;
  public selectedCountry: string = '';
  public selectedGender: string = '';
  public isFormValide: boolean = false;
  public imageUrl: string = './assets/lakatosquadrat.jpg';

  ngOnInit(): void {
    this.personalService.getPersonal().subscribe((list) => {
      list.map((data: any) => {
        this.personals.push(data);
      });
    });
  }

  selectImg() {
    console.log('run');

    // if(file.target.files){
    //   let fileReader = new FileReader();
    //   fileReader.readAsDataURL(file.target.files[0]);
    //   fileReader.onload = (event:any) => {
    //     this.imageUrl = event.target.result;
    //     this.form.value.img = this.imageUrl;
    //     this.selectImg.emit(file);
    //   }
    // }
    console.log(this.selectedUser.value.img);
  }
  selectGender(gender: any) {
    this.selectedGender = gender.value;
  }
  selectCountry() {
    //this.selectedCountry = country.value;
    this.countrys = this.countryCityServices.getCountry();
  }
  details() {}
  deletePersonal(id: string | unknown) {
    // console.log(id);
    //  this.personalService.deletePersonal(id).subscribe()
  }

  /**
   * lädt nur die daten von der user
   * was angeklickt worden ist
   * @param id string
   */
  editPersonal(id: string | unknown) {
    this.openEditForm = true;
    this.personalService.getPersonal().subscribe((data) => {
      this.selectImg();
      const selectedUser = data.find((user: any) => user.id === id);
      this.selectedUser.controls.firstName.setValue(selectedUser.firstName);
      this.selectedUser.controls.lastName.setValue(selectedUser.lastName);
      this.selectedUser.controls.dateOfBirth.setValue(selectedUser.dateOfBirth);
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
      this.selectedUser.value.img = this.imageUrl;
    });
    console.log(this.selectedUser.value);
  }
}
