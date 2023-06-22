import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-new-order',
  templateUrl: './create-new-order.component.html',
  styleUrls: ['./create-new-order.component.scss']
})
export class CreateNewOrderComponent {

  constructor(private formBuilder:FormBuilder){}

  public form = this.formBuilder.group({
    
  })

}
