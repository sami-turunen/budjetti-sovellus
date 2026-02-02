import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetForm } from './budget-form/budget-form';

@Component({
  selector: 'app-root',
  imports: [BudgetForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-temp');
}
