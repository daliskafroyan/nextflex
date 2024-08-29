import { db } from '@/database/db';
import { profilesTable, SelectProfile, UpdateProfile } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function createProfile(
  userId: string,
  name?: string,
  image?: string
) {
  const [profile] = await db
    .insert(profilesTable)
    .values({
      userId,
      name,
      image
    })
    .onConflictDoNothing()
    .returning();
  return profile;
}

export async function updateProfile(userId: string, data: UpdateProfile) {
  const [updatedProfile] = await db
    .update(profilesTable)
    .set(data)
    .where(eq(profilesTable.userId, userId))
    .returning();
  return updatedProfile;
}

export async function getProfile(
  userId: string
): Promise<SelectProfile | undefined> {
  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId))
    .limit(1);
  return profile;
}