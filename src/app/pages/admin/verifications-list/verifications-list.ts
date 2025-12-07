import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {BasePage} from '../../../components/common/base-page/base-page';
import {VerificationService} from '../../../services/verification/verification-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, tap} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Document, DocumentType, documentTypeDescriptions} from '../../../modeles/verification/Document';
import {DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {
  DocumentStatusBadge
} from '../../../components/common/verifications/document-status-badge/document-status-badge';

@Component({
  selector: 'app-verifications-list',
  imports: [
    TableModule,
    DatePipe,
    Button,
    DocumentStatusBadge,
  ],
  templateUrl: './verifications-list.html',
  styleUrl: './verifications-list.scss',
})
export class VerificationsList extends BasePage implements OnInit {
  private verificationsService = inject(VerificationService);
  private destroyRef = inject(DestroyRef);

  public verifications = signal<Document[]>([]);



  public ngOnInit() {
    this.loadVerifications();
  }

  private loadVerifications() {
    this.isLoading.set(true);

    this.verificationsService.getAllVerifications().pipe(
      tap((verifications: Document[]) => {
        this.verifications.set(verifications);
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  public verify(document: Document) {
    this.isLoading.set(true);

    this.verificationsService.verify(document.id, "approve").pipe(
      tap(() => {
        this.loadVerifications();
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  public reject(document: Document) {
    this.isLoading.set(true);

    this.verificationsService.verify(document.id, "reject").pipe(
      tap(() => {
        this.loadVerifications();
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  public download(document: Document) {

  }

  public documentTypeDescriptions = documentTypeDescriptions;
  protected readonly DocumentType = DocumentType;
}
