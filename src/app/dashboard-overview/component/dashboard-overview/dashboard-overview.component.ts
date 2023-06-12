import { Component } from '@angular/core';
import { withNoDomReuse } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent {
  constructor() {}

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
