/*
  Warnings:

  - The `secondaryMuscles` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `bodyPart` on the `Exercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `equipment` on the `Exercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `target` on the `Exercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('body weight', 'cable', 'leverage machine', 'assisted', 'medicine ball', 'stability ball', 'band', 'barbell', 'rope', 'dumbbell', 'ez barbell', 'sled machine', 'upper body ergometer', 'kettlebell', 'olympic barbell', 'weighted', 'bosu ball', 'resistance band', 'roller', 'skierg machine', 'hammer', 'smith machine', 'wheel roller', 'stationary bike', 'tire', 'trap bar', 'elliptical machine', 'stepmill machine');

-- CreateEnum
CREATE TYPE "BodyPart" AS ENUM ('waist', 'upper legs', 'back', 'lower legs', 'chest', 'upper arms', 'cardio', 'shoulders', 'lower arms', 'neck');

-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('abdominals', 'abductors', 'abs', 'adductors', 'ankle stabilizers', 'ankles', 'back', 'biceps', 'brachialis', 'calves', 'cardiovascular system', 'chest', 'core', 'deltoids', 'delts', 'feet', 'forearms', 'glutes', 'grip muscles', 'groin', 'hamstrings', 'hands', 'hip flexors', 'inner thighs', 'latissimus dorsi', 'lats', 'levator scapulae', 'lower abs', 'lower back', 'obliques', 'pectorals', 'quadriceps', 'quads', 'rear deltoids', 'rhomboids', 'rotator cuff', 'serratus anterior', 'shins', 'shoulders', 'soleus', 'spine', 'sternocleidomastoid', 'trapezius', 'traps', 'triceps', 'upper back', 'upper chest', 'wrist extensors', 'wrist flexors', 'wrists');

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "bodyPart",
ADD COLUMN     "bodyPart" "BodyPart" NOT NULL,
DROP COLUMN "equipment",
ADD COLUMN     "equipment" "EquipmentType" NOT NULL,
DROP COLUMN "secondaryMuscles",
ADD COLUMN     "secondaryMuscles" "MuscleGroup"[],
DROP COLUMN "target",
ADD COLUMN     "target" "MuscleGroup" NOT NULL;
