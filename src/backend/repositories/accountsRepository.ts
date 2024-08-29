import { db } from '@/database/db';
import { accountsTable, EmailAccount, GoogleAccount } from '@/database/schema';
import { and, eq } from 'drizzle-orm';

export async function createAccount(
  userId: string,
  password: string,
  accountType: EmailAccount,
  salt: string
) {
  const [account] = await db
    .insert(accountsTable)
    .values({
      userId,
      password,
      salt,
      accountType,
    })
    .returning();

  return account;
}

export async function createAccountViaGoogle(
  userId: string,
  googleID: string,
  accountType: GoogleAccount
) {
  const [account] = await db
    .insert(accountsTable)
    .values({
      userId,
      googleID,
      accountType,
    })
    .returning();

  return account;
}

export async function getAccountByUserId(userId: string) {
  const [account] = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.userId, userId))
    .limit(1);

  return account;
}

export async function getPasswordAccountByUserId(userId: string) {
  const [account] = await db
    .select()
    .from(accountsTable)
    .where(
      and(
        eq(accountsTable.userId, userId),
        eq(accountsTable.accountType, 'email')
      )
    )
    .limit(1);

  return account;
}

export async function getAccountByGoogleID(googleID: string) {
  const [account] = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.googleID, googleID))
    .limit(1);

  return account;
}

export async function updatePassword(
  userId: string,
  password: string,
  salt: string
) {
  const [updatedAccount] = await db
    .update(accountsTable)
    .set({ password, salt })
    .where(
      and(
        eq(accountsTable.userId, userId),
        eq(accountsTable.accountType, 'email')
      )
    )
    .returning();

  return updatedAccount;
}