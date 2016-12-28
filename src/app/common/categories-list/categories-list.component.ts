import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  @Input() isHidden: boolean = true;

  //data service here
  randomTenCategories: string[] = [
    'Category1',
    'Category2',
    'Category3',
    'Category4',
    'Category5',
    'Category6',
    'Category7',
    'Category8',
    'Category9',
    'Category10',
    'Category11'];

  constructor() { }

  ngOnInit() {
  }

}
