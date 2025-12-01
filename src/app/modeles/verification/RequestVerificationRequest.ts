export type VerificationDocumentType = 'id_card' | 'drivers_license';

export type RequestVerificationRequest = {
  documentType: VerificationDocumentType;
  file: File;
};
