import {UserOwnedEntity} from '../BaseEntity';

export type Document = UserOwnedEntity & {
  documentType: DocumentType;
  documentNumber: string;
  issuedDate: Date;
  expiryDate: Date;
  fileUrl: string;
  status: DocumentStatus;
  uploadedAt: Date;
};

export enum DocumentType {
  id_card = 'id_card',
  drivers_license = 'drivers_license',
}

export enum DocumentStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export const documentTypeDescriptions: Record<string, string> = {
  'id_card': 'ID Card',
  'drivers_license': 'Drivers Licence'
};
