"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
require("dotenv/config");
async function main() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new pg_1.Pool({ connectionString });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    const prisma = new client_1.PrismaClient({ adapter });
    try {
        console.log('Attempting to connect to database using Prisma 7 adapter...');
        await prisma.$connect();
        console.log('Connected successfully!');
    }
    catch (error) {
        console.error('Connection failed:', error);
    }
    finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
main();
//# sourceMappingURL=test-prisma-connection.js.map