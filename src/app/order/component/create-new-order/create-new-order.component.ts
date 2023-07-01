import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { OrderApiService } from 'src/app/service/orderApi.service';
import { PersonalService } from 'src/app/service/personal.service';
import { PersonalApiService } from 'src/app/service/personal/personalApi.service';

@Component({
  selector: 'app-create-new-order',
  templateUrl: './create-new-order.component.html',
  styleUrls: ['./create-new-order.component.scss']
})
export class CreateNewOrderComponent implements OnInit, OnDestroy{

  constructor(private formBuilder:FormBuilder,
    private personalService: PersonalService,
    private orderApiService: OrderApiService){}

  public form = this.formBuilder.group({
    customerName:['',Validators.compose([Validators.minLength(3),Validators.maxLength(25),Validators.required])],
    orderTitle:['',Validators.compose([Validators.minLength(3),Validators.maxLength(20),Validators.required])],
    orderDescription:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required])],
    orderDate:[''],
    street:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required])],
    housNumber:['',Validators.required],
    zipCode:['',Validators.compose([Validators.minLength(4),Validators.maxLength(6),Validators.required])],
    city:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required])],
    email:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.email,Validators.required])],
    phone:['',Validators.compose([Validators.minLength(6),Validators.maxLength(24),Validators.required])],
    selectEmployee:['',Validators.required],
    message:['',Validators.maxLength(1000)],
    status:['',Validators.required],
    orderTimeFrom:['',Validators.required],
    orderTimeTo:['',Validators.required]
  });

  public employeesList:any[] = [];
  public modalText:string = '';
  public isSuccess:boolean = true;
  public orderWrong: boolean = false;
  public orderStatus = [
    "Open",
    "In Progress",
    "Completed"
  ]; 

  public orderTimeFrom = [""];
  public orderTimeTo = [""];
  private subject$ = new Subject();

  

  ngOnInit(): void {
    this.personalService.allPersonal();
    this.personalService.personals$.pipe(takeUntil(this.subject$)).subscribe(list => {
      this.employeesList = [];
      console.log(list);
      
      list.map((data:any) => {
        this.employeesList.push(data);
        console.log(this.employeesList);
        
      });
    });
  }

  selectOrderTimeFrom(event:any){
    this.form.controls.orderTimeFrom.setValue(event.target.value);
    console.log(event.target.value);
      
  }
  selectOrderTimeTo(event:any){
    this.form.controls.orderTimeTo.setValue(event.target.value);
    console.log(event.target.value);

  }

  selectEmployee(employee:any){
    console.log(employee.target.value);
    
    this.form.controls.selectEmployee.setValue(employee.target.value);
  }

  selectStatus(status:any){
    this.form.controls.status.setValue(status.target.value);

  }

  /**
   * is the form status VALID
   * then save the order
   */
  saveOrder(){
    if(this.form.status === "VALID"){
      this.orderApiService.postOrder(this.form.value).pipe(takeUntil(this.subject$)).subscribe();
      this.modalText = `Order has been saved and assigned to employee: ${this.form.value.selectEmployee}`;
      this.isSuccess = true;
      console.log(this.form.status);
    }else{
      this.isSuccess = false;
      this.orderWrong = true;
      console.log(this.form.status);
    }
  }

  reset(){
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }



}
