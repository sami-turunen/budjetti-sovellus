import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BudgetFormComponent } from './app/budget-form/budget-form';

bootstrapApplication(BudgetFormComponent, {
  providers: [provideHttpClient()],
}).catch((err) => console.error(err));
