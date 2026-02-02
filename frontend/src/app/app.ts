import { Component, signal } from '@angular/core';
import { BudgetFormComponent } from './budget-form/budget-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BudgetFormComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('frontend-temp');
}
