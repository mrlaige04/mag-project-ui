import {BaseEntity} from '../BaseEntity';

export type User = BaseEntity & {
  email: string;
  phone: string;
  fullName: string;
  dateOfBirth: Date;
  twoFactorEnabled: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  status: UserStatus;
};

export enum UserStatus {
  active = 'active',
  blocked = 'blocked',
  unverified  = 'unverified ',
}
