import { Component, OnInit } from '@angular/core';
import { Personals } from 'src/app/Personal-Module/personals';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-personal-overview',
  templateUrl: './personal-overview.component.html',
  styleUrls: ['./personal-overview.component.scss']
})
export class PersonalOverviewComponent implements OnInit{

  constructor(private personalService: PersonalService){}

  public personals:any[] = [];
  ngOnInit(): void {
    this.personalService.getPersonal().subscribe(list => {
      this.personals = list
      // list.map((data:any) => {
      //   this.personals.push(data);
      // });
    });
  }

  deletePersonal(id: string | unknown){
   // console.log(id);
  //  this.personalService.deletePersonal(id).subscribe()
  }

  editPersonal(id: string | unknown){
    console.log(id);
    
  }
}
