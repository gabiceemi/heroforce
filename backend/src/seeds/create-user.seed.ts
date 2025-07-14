import * as bcrypt from 'bcrypt';

import { DataSource } from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'heroforce',
  entities: [User, Project],
  synchronize: false,
});

async function seed() {
  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  const existing = await userRepository.findOneBy({ email: 'gabriel@innspire.com' });
  if (existing) {
  console.log('🧠 Usuário Gabriel já existe.');
  await dataSource.destroy();
  process.exit(0);
}

  const passwordHash = await bcrypt.hash('123456', 10);

  const user = userRepository.create({
    name: 'Gabriel C Medeiros',
    email: 'gabriel@innspire.com',
    password: passwordHash,
    character: 'professor',
  });

  await userRepository.save(user);

  console.log('✅ Usuário "Gabriel C Medeiros" criado com sucesso.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Erro ao rodar seed:', err);
  process.exit(1);
});
