import { env } from '@/config/env';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import 'server-only';

const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
