import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() isHidden: boolean;
  @Output() onToggleCategoryBox = new EventEmitter<boolean>();

  private isActive: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle(categoriesLink: HTMLAnchorElement) {
    this.isActive = !this.isActive;

    if (this.isHidden) {
      categoriesLink.innerHTML = 'Hide categories';
    } else {
      categoriesLink.innerHTML = 'Show categories';
    }

    this.onToggleCategoryBox.emit(!this.isHidden);
  }
}
