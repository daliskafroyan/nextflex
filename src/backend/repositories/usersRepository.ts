import { db } from '@/database/db';
import { UpdateUser, usersTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function getUser(userID: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userID))
    .limit(1);
  return user;
}

export async function createUser(email: string) {
  const [user] = await db
    .insert(usersTable)
    .values({
      email,
    })
    .returning();
  return user;
}

export async function deleteUser(userID: string) {
  await db.delete(usersTable).where(eq(usersTable.id, userID));
}

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return user;
}

export async function updateUser(userID: string, updatedUser: UpdateUser) {
  const [updatedUserResult] = await db
    .update(usersTable)
    .set(updatedUser)
    .where(eq(usersTable.id, userID))
    .returning();
  return updatedUserResult;
}

export async function verifyEmail(userID: string) {
  await db
    .update(usersTable)
    .set({ emailVerified: new Date() })
    .where(eq(usersTable.id, userID));
}