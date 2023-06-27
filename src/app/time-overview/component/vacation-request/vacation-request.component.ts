import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent implements OnInit{

  constructor(private personalService: PersonalService,
     private formBuilder:FormBuilder,
     private employeeService: EmployeeService){}

  public img: string = "";
  public employeeName: string = "";
  public employeeId: string = "";
  public form = this.formBuilder.group({
    dateFrom:['',Validators.required],
    dateTo:['',Validators.required],
    days:['',Validators.required],
    name:[''],
    empId:[''],
    approved:[false]
  });
  public vacation:any[] = [];


  ngOnInit(): void {
    const logedEmployee = localStorage.getItem('employeeIsLogd')!;
    const jsonLogedEmployee = JSON.parse(logedEmployee);
    this.personalService.getPersonal().subscribe((list) => {
      const result = list.find((emp:any) => emp.email === jsonLogedEmployee.email && emp.id === jsonLogedEmployee.password);
      this.img = result.img;
      this.employeeId = result.id;
      this.employeeName = `${result.firstName}  ${result.lastName}`;
    }); 

     this.employeeService.getVacationRequest().subscribe((vacation) => {
      this.vacation = vacation;
      console.log(vacation,'vacation');
    });
    
  }




  vacationRequest(){
    if(this.form.status === "VALID"){
      this.form.controls.name.setValue(this.employeeName);
      this.form.controls.empId.setValue(this.employeeId);
      this.employeeService.vacationRequest(this.form.value).subscribe();
      console.log('modal success');

    }else{
      console.log('modal wrong');
    }
    
  }

}
