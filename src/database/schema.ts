import { pgTable, text, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import {
  dateField,
  dateRequiredField,
  dateWithDefaultField,
  idField,
  updateAtField,
} from './customFields';

export const accountTypeEnum = ['email', 'google'] as const;
export const roleEnum = ['admin', 'user'] as const;

const timestamps = {
  createdAt: dateWithDefaultField('created_at'),
  updatedAt: updateAtField(),
};

export const usersTable = pgTable('user', {
  id: idField(),
  email: text('email').unique(),
  role: text('role', { enum: roleEnum }).notNull().default('user'),
  emailVerified: dateField('email_verified'),
  ...timestamps,
});
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type UpdateUser = Partial<Omit<SelectUser, 'id'>>;

export const accountsTable = pgTable('accounts', {
  id: idField(),
  userId: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  accountType: text('account_type', { enum: accountTypeEnum }).notNull(),
  googleID: text('google_id').unique(),
  password: text('password'),
  salt: text('salt'),
  ...timestamps,
});
export type InsertAccount = typeof accountsTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;
export type AccountType = (typeof accountTypeEnum)[number];
export type EmailAccount = (typeof accountTypeEnum)[0];
export type GoogleAccount = (typeof accountTypeEnum)[1];

export const profilesTable = pgTable('profile', {
  id: idField(),
  userId: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique()
    .notNull(),
  name: text('name'),
  image: text('image'),
  ...timestamps,
});
export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;
export type UpdateProfile = Partial<Omit<SelectProfile, 'id' | 'userId'>>;

export const sessionsTable = pgTable('session', {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: dateRequiredField('expired_at'),
});
export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;

const tokenFields = {
  id: idField(),
  tokenExpiresAt: dateRequiredField('token_expires_at'),
};

export const resetTokensTable = pgTable('reset_tokens', {
  userId: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique()
    .notNull(),
  token: text('token').notNull().unique(),
  ...tokenFields,
});
export type InsertResetToken = typeof resetTokensTable.$inferInsert;
export type SelectResetToken = typeof resetTokensTable.$inferSelect;

export const verificationTokensTable = pgTable('verification_tokens', {
  userId: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique()
    .notNull(),
  token: text('token').notNull().unique(),
  ...tokenFields,
});
export type InsertVerificationToken =
  typeof verificationTokensTable.$inferInsert;
export type SelectVerificationToken =
  typeof verificationTokensTable.$inferSelect;
