import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent implements OnInit{

  constructor(private personalService: PersonalService, private formBuilder:FormBuilder){}

  public img: string = "";
  public employeeName: string = "";
  public form = this.formBuilder.group({
    dateFrom:[''],
    dateTo:[''],
    days:['']
  });


  ngOnInit(): void {
    const logedEmployee = localStorage.getItem('employeeIsLogd')!;
    const jsonLogedEmployee = JSON.parse(logedEmployee);
    this.personalService.getPersonal().subscribe((list) => {
      const result = list.find((emp:any) => emp.email === jsonLogedEmployee.email && emp.id === jsonLogedEmployee.password);
      this.img = result.img;
      this.employeeName = `${result.firstName}  ${result.lastName}`;
      console.log(result);
      
    })  
  }

  vacationRequest(){
    console.log(this.form.value);
    
  }

}
