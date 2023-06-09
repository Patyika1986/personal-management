import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CountryCityService } from 'src/app/service/country-city.service';
import { PersonalService } from 'src/app/service/personal.service';
import { PersonalApiService } from 'src/app/service/personal/personalApi.service';

@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss'],
})
export class AddPersonalComponent implements OnInit, OnDestroy{
  constructor(
    public formBuilder: FormBuilder,
    public personalServiace: PersonalService,
    public countryCityServices: CountryCityService,
    private personalApiService: PersonalApiService
  ) {}

  @Input() form = this.formBuilder.group({
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

  private subject$ = new Subject();
  public genders = ['Male', 'Female', 'Other'];

  public countrys: any;
  public selectedCountry: string = '';
  public selectedGender: string = '';
  public isFormValide: boolean = false;
  @Input() imageUrl = './assets/lakatosquadrat.jpg';
  @Output() selectImg = new EventEmitter();
  @Output() selectcountry = new EventEmitter();
  public modalText: string = 'Saving the changes was successful';
  public isChangeSuccessfuly: boolean = true;
  public changeIsWrong: boolean = false;

  ngOnInit(): void {
    this.countrys = this.countryCityServices.getCountry();
  }

  onSelectImageFile(file: any) {
    if (file.target.files) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file.target.files[0]);
      fileReader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.form.value.img = event.target.result;
        this.selectImg.emit(file);
      };
    }
  }

  selectGender(gender: any) {
    this.selectedGender = gender.value;
    this.form.value.gender = gender.value;
  }

  selectCountry(country: any) {
    this.selectedCountry = country.value;
    this.form.controls.country.setValue(country.value);
    this.selectcountry.emit(this.countrys);
  }

  saveChanges(form: any) {
    this.personalServiace.allPersonal();
    this.personalServiace.personals$.pipe(takeUntil(this.subject$)).subscribe((personalList) => {
      const result = personalList.find(
        (person: any) =>
          person.id === this.personalApiService.selectedEmployeeId()
      );

      if (result) {
        this.personalApiService
          .postPersonal(
            this.form.value,
            this.personalApiService.selectedEmployeeId()
          ).pipe(takeUntil(this.subject$))
          .subscribe((list) => {
            this.imageUrl = list.img;
          });
      } else {
        this.isChangeSuccessfuly = false;
        this.changeIsWrong = true;
        this.modalText = 'Change was unsuccessful';
      }
    });
  }

  resetForm() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
