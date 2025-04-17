import { PrismaClient, $Enums } from '@prisma/client';
import * as fs from 'fs';
import { Client as MinioClient } from 'minio';

const prisma = new PrismaClient();

const minioClient = new MinioClient({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000', 10),
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER || 'admin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'admin123',
});

async function main() {
  const rawData = fs.readFileSync(
    './prisma/seeds/data/exercises.json',
    'utf-8',
  );
  const exercises = JSON.parse(rawData);

  for (const item of exercises) {
    try {
      const exercise = await prisma.exercise.upsert({
        where: { externalId: item.id },
        update: {},
        create: {
          externalId: item.id,
          name: item.name,
          bodyPart: (item.bodyPart as string)
            .toUpperCase()
            .replaceAll(' ', '_') as $Enums.BodyPart,
          equipment: (item.equipment as string)
            .toUpperCase()
            .replaceAll(' ', '_') as $Enums.EquipmentType,
          target: (item.target as string)
            .toUpperCase()
            .replaceAll(' ', '_') as $Enums.MuscleGroup,
          secondaryMuscles: item.secondaryMuscles.map(
            (muscle: string) =>
              muscle.toUpperCase().replaceAll(' ', '_') as $Enums.MuscleGroup,
          ),
          instructions: item.instructions,
        },
      });

      // Upload GIF to MinIO
      const gifPath = item.gif_local_path || `gifs/${item.id}.gif`;
      if (gifPath) {
        let gifStream = null;
        try {
          gifStream = fs.createReadStream(`./prisma/seeds/data/${gifPath}`);
        } catch (error) {
          console.error(`😥 File not found: ${gifPath}`);
        }
        if (gifStream) {
          const gifName = `gifs/${item.id}.gif`;
          await minioClient.putObject(
            process.env.MINIO_BUCKET,
            gifName,
            gifStream,
          );

          await prisma.exerciseMedia.upsert({
            where: { id: exercise.id },
            update: {},
            create: {
              id: exercise.id,
              exerciseId: exercise.id,
              url: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${gifName}`,
              mediaType: 'GIF',
            },
          });
        }
      }
    } catch (error) {
      console.error(`🚫 Error seeding exercise ${item.id}:`, error);
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
