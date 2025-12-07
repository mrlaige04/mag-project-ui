import {UserOwnedEntity} from '../BaseEntity';

export type HistoryItem = UserOwnedEntity & {
  eventType: HistoryEventType;
  meta: unknown;
  timestamp: Date;
};

export enum HistoryEventType {
  LOGIN,
  LOGOUT,
  REGISTER,
  TRANSFER,
  CARD_BLOCK,
  CARD_UNBLOCK,
  CARD_CLOSE,
  VERIFICATION,
  PASSWORD_CHANGE,
  PROFILE_UPDATE,
  ADMIN_ACTION
}
