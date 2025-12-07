import {Component, computed, input} from '@angular/core';
import {Document} from '../../../../modeles/verification/Document';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-document-status-badge',
  imports: [Tag],
  template: `
    @if (document()) {
      <p-tag [severity]="statusStyle().severity">{{ document().status }}</p-tag>
    }
  `,
})
export class DocumentStatusBadge {
  public document = input.required<Document>();

  private statusMap: Record<string, DocumentStatusStyle> = {
    'pending': { severity: 'info' },
    'rejected': { severity: 'error' },
    'approved': { severity: 'success' },
  };

  public statusStyle = computed(() => this.statusMap[this.document().status] as any);
}

type DocumentStatusStyle = {
  severity: string;
};
