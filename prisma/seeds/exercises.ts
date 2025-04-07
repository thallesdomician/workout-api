import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const rawData = fs.readFileSync(
    './prisma/seeds/data/exercises.json',
    'utf-8',
  );
  const exercises = JSON.parse(rawData);

  for (const item of exercises) {
    try {
      await prisma.exercise.upsert({
        where: { externalId: item.id },
        update: {},
        create: {
          externalId: item.id,
          name: item.name,
          bodyPart: item.bodyPart,
          equipment: item.equipment,
          target: item.target,
          secondaryMuscles: item.secondaryMuscles,
          instructions: item.instructions,
        },
      });
    } catch (error) {
      console.error(`Error seeding exercise ${item.id}:`, error);
    }
  }

  console.log(`✅ Seeded ${exercises.length} exercises.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
