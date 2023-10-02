import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[];

  selectedItem: MenuItem;

  constructor() {
    this.menuItems = [
      { name: 'i', descr: 'Ingredients' },
      { name: 'r', descr: 'Recipes' },
    ];
    this.selectedItem = this.menuItems[0];
  }

  ngOnInit(): void {
  }

}

interface MenuItem {
  name: string,
  descr: string
}
