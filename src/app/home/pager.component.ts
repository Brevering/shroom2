import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { HomeComponent } from './index';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html'
})
export class PagerComponent implements DoCheck {

    @Input() numberOfPages: number;
    @Input() postsNbr: number;
    private range: number[];

    constructor(private homeComponent: HomeComponent){}

    createRange(number: number) {
        let items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }
    ngDoCheck(){
        this.range = this.createRange(Math.ceil(this.postsNbr / 8) );
    }
}
