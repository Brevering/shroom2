import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

    @Output() onTextInput = new EventEmitter<string>();

    private sortingProperties: string[];
    private sortingProperty: string;
    private direction: string;
    private pageSize: number;
    private currentPage: number;
    private numberOfPages: number;

    constructor( private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  onInput(e: any) {
        this.onTextInput.emit(e.target.value);
    }

}
