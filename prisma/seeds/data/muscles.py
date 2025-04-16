import json

with open('exercises.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

muscles = set()
equipments = set()

for exercise in data:
    target = exercise.get('target')
    if target:
        muscles.add(target.strip())

    secondary = exercise.get('secondaryMuscles', [])
    for muscle in secondary:
        muscles.add(muscle.strip())

        # Adiciona os equipamentos
    equipment = exercise.get('equipment')
    if equipment:
        equipments.add(equipment.strip())

# Ordena e imprime em formato de enum Prisma
print("enum MuscleGroup {")
for muscle in sorted(muscles):
    identifier = muscle.upper().replace(' ', '_').replace('-', '_')
    print(f"  {identifier} @map(\"{muscle}\")")
print("}")

# Gera o enum EquipmentType
print("\nenum EquipmentType {")
for equipment in sorted(equipments):
    identifier = equipment.upper().replace(' ', '_').replace('-', '_')
    print(f"  {identifier} @map(\"{equipment}\")")
print("}")