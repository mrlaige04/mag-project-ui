import {BaseEntity} from '../BaseEntity';
import {DocumentStatus} from './Document';

export type VerificationStatus = BaseEntity & {
  status: DocumentStatus;
};

