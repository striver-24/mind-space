import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { dot } from 'node:test/reporters';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('🛑DATABASE_URL is not set');
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
    try{
        console.log('🟡 Migrating Client');
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('🟢 Successfully Migrated!');
    }
    catch (error) {
        console.log('🚨 Error Migrating Client:');
    }
};
migrateDb();
export default db;