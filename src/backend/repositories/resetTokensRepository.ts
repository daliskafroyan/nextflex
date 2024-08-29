import { db } from '@/database/db';
import { resetTokensTable, SelectResetToken } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createResetToken(
  userId: string,
  token: string,
  tokenExpiresAt: Date
) {
  const [resetToken] = await db
    .insert(resetTokensTable)
    .values({
      userId,
      token,
      tokenExpiresAt
    })
    .returning();
  return resetToken;
}

export async function getResetToken(
  token: string
): Promise<SelectResetToken | undefined> {
  const [resetToken] = await db
    .select()
    .from(resetTokensTable)
    .where(eq(resetTokensTable.token, token))
    .limit(1);
  return resetToken;
}

export async function deleteResetToken(token: string) {
  await db
    .delete(resetTokensTable)
    .where(eq(resetTokensTable.token, token));
}

export async function deleteResetTokensByUserId(userId: string) {
  await db
    .delete(resetTokensTable)
    .where(eq(resetTokensTable.userId, userId));
}