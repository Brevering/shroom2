import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // child-parent-child communication
  @Input() isToggledOn: boolean = true;
}
