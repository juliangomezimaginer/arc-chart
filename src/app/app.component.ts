import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formModel = {
    unit: 'cans',
    value: 50,
    critical: 10,
    low: 20,
    full: 50,
  };
}
