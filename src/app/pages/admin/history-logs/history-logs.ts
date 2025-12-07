import {Component, DestroyRef, inject, NgZone, OnInit, signal} from '@angular/core';
import {BasePage} from '../../../components/common/base-page/base-page';
import {HistoryService} from '../../../services/history/history-service';
import {HistoryItem} from '../../../modeles/history/history';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, map, tap} from 'rxjs';
import {TableModule} from 'primeng/table';
import {DatePipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-history-logs',
  imports: [
    TableModule,
    DatePipe,
    JsonPipe
  ],
  templateUrl: './history-logs.html',
  styleUrl: './history-logs.scss',
})
export class HistoryLogs extends BasePage implements OnInit {
  private historyService = inject(HistoryService);
  private destroyRef = inject(DestroyRef);

  public history = signal<HistoryItem[]>([]);

  public ngOnInit() {
    this.loadHistory();
  }

  private loadHistory() {
    this.isLoading.set(true);

    this.historyService.getAll().pipe(
      tap((histories: HistoryItem[]) => {
        this.history.set(histories);
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }
}
