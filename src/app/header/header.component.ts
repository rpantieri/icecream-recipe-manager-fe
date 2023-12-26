import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] | undefined;

  selectedItem: MenuItem | undefined;

  constructor(private translateService: TranslateService) {
    
  }

  ngOnInit(): void {
    this.translateService.get('HEADER.INGREDIENTS').subscribe(()=>{
      this.menuItems = [
        { label:  this.translateService.instant('HEADER.INGREDIENTS'), routerLink:['/ingredients']},
        { label:  this.translateService.instant('HEADER.RECIPES'), routerLink:['/recipes']}
      ];
    });
    
    
  }

}
