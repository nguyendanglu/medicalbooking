import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function seed() {
  console.log('Seeding administrative users...');
  const roles = ['ADMIN', 'DOCTOR', 'STAFF'];
  
  for (const role of roles) {
    const email = `${role.toLowerCase()}@clinic.com`;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
      const password = await bcrypt.hash('P@ssw0rd123', 10);
      await prisma.user.create({
        data: {
          email,
          password,
          firstName: 'Test',
          lastName: role,
          role
        }
      });
      console.log(`Created user: ${email} with password: P@ssw0rd123`);
    } else {
      console.log(`User already exists: ${email}`);
    }
  }
}

seed()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
