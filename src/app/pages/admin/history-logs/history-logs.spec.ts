import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLogs } from './history-logs';

describe('HistoryLogs', () => {
  let component: HistoryLogs;
  let fixture: ComponentFixture<HistoryLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
