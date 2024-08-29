import { db } from '@/database/db';
import { SelectVerificationToken, verificationTokensTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createVerificationToken(
  userId: string,
  token: string,
  tokenExpiresAt: Date
) {
  const [verificationToken] = await db
    .insert(verificationTokensTable)
    .values({
      userId,
      token,
      tokenExpiresAt
    })
    .returning();
  return verificationToken;
}

export async function getVerificationToken(
  token: string
): Promise<SelectVerificationToken | undefined> {
  const [verificationToken] = await db
    .select()
    .from(verificationTokensTable)
    .where(eq(verificationTokensTable.token, token))
    .limit(1);

  console.log('#debug verif tokens', verificationToken)
  return verificationToken;
}

export async function deleteVerificationToken(token: string) {
  await db
    .delete(verificationTokensTable)
    .where(eq(verificationTokensTable.token, token));
}

export async function deleteVerificationTokensByUserId(userID: string) {
  await db
    .delete(verificationTokensTable)
    .where(eq(verificationTokensTable.userId, userID));
}