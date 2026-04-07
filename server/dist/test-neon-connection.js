"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_neon_1 = require("@prisma/adapter-neon");
const serverless_1 = require("@neondatabase/serverless");
const ws_1 = __importDefault(require("ws"));
require("dotenv/config");
async function main() {
    const connectionString = process.env.DATABASE_URL;
    serverless_1.neonConfig.webSocketConstructor = ws_1.default;
    const pool = new serverless_1.Pool({ connectionString });
    const adapter = new adapter_neon_1.PrismaNeon(pool);
    const prisma = new client_1.PrismaClient({ adapter });
    try {
        console.log('Attempting to connect to Neon database using Prisma 7 adapter...');
        await prisma.$connect();
        console.log('Connected successfully to Neon!');
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
//# sourceMappingURL=test-neon-connection.js.map