import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  constructor(private router:Router) {}

  private expand: boolean = false;
  public darkMode: boolean = false;

  expandAside() {
    this.expand = !this.expand;
    const linkText = document.querySelectorAll('.link-text');
    if (this.expand) {
      const items = Array.from(linkText);
      for (const itemList of items) {
        itemList.classList.add('link-style');
      }
    } else {
      const items = Array.from(linkText);
      for (const itemList of items) {
        itemList.classList.remove('link-style');
      }
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    const aside = document.querySelector('#aside') as HTMLElement;
    const linkText = document.querySelectorAll('.links');

    if (this.darkMode) {
      aside.style.backgroundColor = 'rgb(18, 18, 27)';
    } else {
      aside.style.backgroundColor = 'whitesmoke';
    }

    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
  }



}
