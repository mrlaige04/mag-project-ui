import {UserOwnedEntity} from '../BaseEntity';
import {CardProvider, CardType} from './Card';

export type CardApplication = UserOwnedEntity & {
  cardType: CardType;
  provider: CardProvider;
  status: ApplicationStatus;
  appliedAt: Date;
  processedAt: Date;
};

export enum ApplicationStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}
