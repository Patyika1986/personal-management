import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-create-new-order',
  templateUrl: './create-new-order.component.html',
  styleUrls: ['./create-new-order.component.scss']
})
export class CreateNewOrderComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,
    private personalService: PersonalService,
    private orderService: OrderService){}

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
    phone:['',Validators.compose([Validators.minLength(6),Validators.maxLength(14),Validators.required])],
    selectEmployee:['',Validators.required],
    message:['',Validators.maxLength(1000)],
    status:['']
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

  

  ngOnInit(): void {
    this.personalService.getPersonal().subscribe(list => {
      list.map((data:any) => {
        this.employeesList.push(data);
      });
    });
  }

  selectEmployee(employee:any){
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
      this.orderService.postOrder(this.form.value).subscribe();
      this.modalText = `Order has been saved and assigned to employee: ${this.form.value.selectEmployee}`;
      console.log(this.form.status);
    }else{
      this.isSuccess = false;
      this.orderWrong = true;
      console.log(this.form.status);
    }
  }



}
