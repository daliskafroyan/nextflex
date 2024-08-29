import { randomUUID } from 'crypto';
import { text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const idField = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID());

export const dateField = (fieldName: string) =>
  timestamp(fieldName, { mode: 'date', withTimezone: true });

export const dateRequiredField = (fieldName: string) =>
  dateField(fieldName).notNull();

export const dateWithDefaultField = (fieldName: string) =>
  dateField(fieldName).defaultNow();

export const updateAtField = () =>
  timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow();

export const booleanField = (fieldName: string) =>
  boolean(fieldName).default(false);

export const booleanDefTrueField = (fieldName: string) =>
  boolean(fieldName).default(true);