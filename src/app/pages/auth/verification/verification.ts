import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {LabeledInput} from '../../../components/forms';
import {SelectButton} from 'primeng/selectbutton';
import {BasePage} from '../../../components/common/base-page/base-page';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {Button} from 'primeng/button';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {VerificationService} from '../../../services/verification/verification-service';
import {RequestVerificationRequest} from '../../../modeles/verification/RequestVerificationRequest';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, finalize, of, tap} from 'rxjs';
import {VerificationStatus} from '../../../modeles/verification/VerificationStatus';
import {DocumentStatus} from '../../../modeles/verification/Document';
import {Message} from 'primeng/message';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-verification',
  imports: [
    LabeledInput,
    SelectButton,
    FileUpload,
    Button,
    ReactiveFormsModule,
    Message,
    NgTemplateOutlet
  ],
  templateUrl: './verification.html',
  styleUrl: './verification.scss',
})
export class Verification extends BasePage implements OnInit {
  private verificationService = inject(VerificationService);
  private destroyRef = inject(DestroyRef);

  public form = this.fb.group({
    documentType: this.fb.control('id_card', [Validators.required]),
  });

  public alert = signal<{
    message: string;
    severity: 'info' | 'error' | 'success';
  } | null>(null);

  public showForm = signal<boolean>(true);

  public alreadyExistingVerificationStatus = signal<VerificationStatus | null>(null);

  public ngOnInit() {
    this.verificationService.checkVerificationStatus().pipe(
      tap(async (verificationStatus: VerificationStatus) => {
        if (verificationStatus.status === DocumentStatus.approved) {
          await this.router.navigate(['dashboard']);
          return;
        }

        if (verificationStatus.status === DocumentStatus.rejected) {
          this.alert.set({
            severity: 'error',
            message: "Oops :( Your verification was rejected. Please submit another document below"
          });
        } else if (verificationStatus.status === DocumentStatus.pending) {
          this.alert.set({
            severity: 'info',
            message: 'You already submitted your verification document. Please wait until our managers approve or reject your submission'
          });

          this.showForm.set(false);
        }
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  private documentFile: File | null = null;

  public availableDocumentTypes: VerificationDocument[] = [
    {
      documentType: "id_card",
      displayName: "ID Card",
      icon: 'pi pi-id-card'
    },
    {
      documentType: "drivers_license",
      displayName: "Drivers License",
      icon: 'pi pi-car'
    }
  ];

  public onDocumentSelect(event: FileSelectEvent) {
    const file = event.files[0];
    this.documentFile = file;
  }

  public get isFormValid() {
    return this.form.valid && this.documentFile && this.documentFile.size;
  }

  public submit() {
    if (!this.isFormValid) {
      return;
    }

    this.isLoading.set(true);
    this.verificationService.requestVerification({
      ...this.form.value,
      file: this.documentFile!
    } as RequestVerificationRequest).pipe(
      catchError(() => of(null)),
      tap(async res => {
        if (res) {
          this.alert.set({
            severity: 'success',
            message: 'Your document has been submitted successfully! Please wait until our managers approve or reject your submission'
          });

          this.showForm.set(false);
        }
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }
}

type VerificationDocument = {
  documentType: string;
  displayName: string;
  icon?: string;
};
