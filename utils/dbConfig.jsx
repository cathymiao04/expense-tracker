import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

// const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const sql = neon('postgresql://expense-tracker_owner:tC80qBEpWGUH@ep-dry-tree-a5dfo00n.us-east-2.aws.neon.tech/expense-tracker?sslmode=require');
export const db = drizzle(sql, { schema });