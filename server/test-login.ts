import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function testLogin() {
  console.log('Testing login...');
  const user = await prisma.user.findUnique({
    where: { email: 'admin@clinic.com' }
  });

  if (!user) {
    console.log('User not found!');
  } else {
    console.log('User found! Password hash length:', user.password.length);
    const pass = 'P@ssw0rd123';
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(`Password match with P@ssw0rd123? ${isMatch}`);
  }
}

testLogin()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
