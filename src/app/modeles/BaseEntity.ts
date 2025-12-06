export type BaseEntity = {
  id: string;
};

export type UserOwnedEntity = BaseEntity & {
  userId?: string;
};
