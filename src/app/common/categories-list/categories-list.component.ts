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
    'Film and Animation',
    'Cars & Vehicles',
    'Music',
    'Pets & Animals',
    'Sports',
    'Travel & Events',
    'Gaming',
    'People & Blogs',
    'Comedy'];

  constructor() { }

  ngOnInit() {
  }

}
