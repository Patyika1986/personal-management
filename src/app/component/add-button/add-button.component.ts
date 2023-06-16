import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {

  @Input({required:true}) label: string = '';
  @Output() addEmployees = new EventEmitter<string>();

  add($event:any){
    this.addEmployees.emit($event);    
  }

}
