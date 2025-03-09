import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const seedSongs = async (prismaClient: PrismaClient) => {
  const songs = Array.from({ length: 100 }, () => ({
    title: faker.lorem.words(),
    artist: faker.person.fullName(),
    year: faker.date
      .past({
        years: 50,
      })
      .getFullYear(),
    duration: faker.number.int({ min: 60, max: 300 }),
    mimeType: 'audio/mpeg',
    size: faker.number.int({ min: 1000000, max: 10000000 }),
  }));

  await prismaClient.song.createMany({ data: songs });
};
