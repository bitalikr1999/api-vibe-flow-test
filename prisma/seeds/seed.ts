import { PrismaClient } from '@prisma/client';
import { seedSongs } from './songs.seed';

const prisma = new PrismaClient();

async function main() {
  await seedSongs(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
