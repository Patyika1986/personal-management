import { Component } from '@angular/core';
import { withNoDomReuse } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent {
  constructor(){}


  private expand:boolean = false;

  expandAside(){
    this.expand = !this.expand;
    const linkText = document.querySelectorAll('.link-text');
    if(this.expand){
      const items = Array.from(linkText);
     for(const itemList of items){
      itemList.classList.add('link-style');
     }
     
    }else {
      const items = Array.from(linkText);
     for(const itemList of items){
      itemList.classList.remove('link-style');
     }
      
    }


    // const linkText = document.querySelectorAll('.link-text');
    // linkText.style.display = 'block'
    // const anchor = Array.from(linkText);
    // for(const list of anchor){
    //  console.log( list.getElementsByClassName('link-text'));
     
    // }
     
    
  }

}
