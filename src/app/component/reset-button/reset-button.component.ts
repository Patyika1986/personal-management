import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss']
})
export class ResetButtonComponent {
  @Input({required:true}) label: string = '';
  @Output() resetForm = new EventEmitter<string>();

  reset($event:any){
    this.resetForm.emit($event);    
  }
}
