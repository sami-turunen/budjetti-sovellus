import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, tap } from 'rxjs';
import Chart from 'chart.js/auto';

interface BudgetItem {
  name: string;
  amount: number;
  category: string;
}

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './budget-form.html',
  styleUrls: ['./budget-form.css'],
})
export class BudgetFormComponent implements OnInit, AfterViewInit {
  private apiUrl = 'http://localhost:3001/api';

  private refreshTulot$ = new BehaviorSubject<void>(undefined);
  private refreshMenot$ = new BehaviorSubject<void>(undefined);

  tulot$: Observable<BudgetItem[]>;
  menot$: Observable<BudgetItem[]>;

  private tLista: BudgetItem[] = [];
  private mLista: BudgetItem[] = [];

  newTulo: BudgetItem = { name: '', amount: 0, category: 'palkka' };
  newMeno: BudgetItem = { name: '', amount: 0, category: 'ruoka' };

  @ViewChild('acquisitions') canvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private http: HttpClient) {
    this.tulot$ = this.refreshTulot$.pipe(
      switchMap(() => this.http.get<BudgetItem[]>(`${this.apiUrl}/tulot`)),
      tap(data => {
        this.tLista = data;
        this.updateTotalsAndChart();
      })
    );

    this.menot$ = this.refreshMenot$.pipe(
      switchMap(() => this.http.get<BudgetItem[]>(`${this.apiUrl}/menot`)),
      tap(data => {
        this.mLista = data;
        this.updateTotalsAndChart();
      })
    );
  }

  ngOnInit(): void {
    this.refreshTulot$.next();
    this.refreshMenot$.next();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  addTulo(): void {
    if (!this.newTulo.name || this.newTulo.amount <= 0) return;
    this.http.post(`${this.apiUrl}/tulot`, this.newTulo).subscribe(() => {
      this.newTulo = { name: '', amount: 0, category: 'palkka' };
      this.refreshTulot$.next();
    });
  }

  addMeno(): void {
    if (!this.newMeno.name || this.newMeno.amount <= 0) return;
    this.http.post(`${this.apiUrl}/menot`, this.newMeno).subscribe(() => {
      this.newMeno = { name: '', amount: 0, category: 'ruoka' };
      this.refreshMenot$.next();
    });
  }

  get totalTulot(): number {
    return this.tLista.reduce((sum, item) => sum + Number(item.amount), 0);
  }

  get totalMenot(): number {
    return this.mLista.reduce((sum, item) => sum + Number(item.amount), 0);
  }

  get erotus(): number {
    return this.totalTulot - this.totalMenot;
  }

  private createChart(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Tulot', 'Menot'],
        datasets: [{
          label: '€',
          data: [this.totalTulot, this.totalMenot],
          backgroundColor: ['#4caf50', '#f44336']
        }]
      },
      options: {
        responsive: true,
      }
    });
  }

  private updateTotalsAndChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.totalTulot, this.totalMenot];
      this.chart.update();
    }
  }
}
