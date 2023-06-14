import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  constructor(private router: Router){}

  public currentOrdersBadge:number = 0;
  public employeeLength: number = 0;
  public totalTimeBadge: number = 0;
  public currentPersonalLength: number = 0;


  navigateToPersonal(){
    this.router.navigate(['personal-overview'])
  }

}
