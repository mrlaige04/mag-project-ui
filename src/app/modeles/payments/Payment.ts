import {BaseEntity} from '../BaseEntity';

export type Payment = BaseEntity & {
  senderCardId: string;
  receiverCardId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  comment?: string;
  createdAt: Date;
  completedAt?: Date;
};

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}
