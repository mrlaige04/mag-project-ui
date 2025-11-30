import {Component, DestroyRef, inject} from '@angular/core';
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

@Component({
  selector: 'app-verification',
  imports: [
    LabeledInput,
    SelectButton,
    FileUpload,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './verification.html',
  styleUrl: './verification.scss',
})
export class Verification extends BasePage {
  private verificationService = inject(VerificationService);
  private destroyRef = inject(DestroyRef);

  public form = this.fb.group({
    documentType: this.fb.control('id_card', [Validators.required]),
  });

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
          await this.router.navigate(['dashboard']);
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
