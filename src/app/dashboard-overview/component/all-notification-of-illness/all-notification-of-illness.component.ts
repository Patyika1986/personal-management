import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-all-notification-of-illness',
  templateUrl: './all-notification-of-illness.component.html',
  styleUrls: ['./all-notification-of-illness.component.scss']
})
export class AllNotificationOfIllnessComponent implements OnInit{
  
  constructor(private employeeService: EmployeeService){}

  public sickLength:number = 0;
  public sickList:any[] = [];

  ngOnInit(): void {
    this.employeeService.getNotificationOfIllness().subscribe(allSickNotifi => {
      this.sickLength = allSickNotifi.length;
      this.sickList = allSickNotifi;
      console.log(this.sickList);
      
    })
  }

}
