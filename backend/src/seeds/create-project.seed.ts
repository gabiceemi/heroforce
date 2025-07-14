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
    const projectRepository = dataSource.getRepository(Project);

    const user = await userRepository.findOneBy({ email: 'gabriel@innspire.com' });

    if (!user) {
        console.error('❌ Usuário Gabriel não encontrado. Rode a seed de usuário antes.');
        process.exit(1);
    }

    const exists = await projectRepository.findOneBy({ name: 'X-Force: VisionOps' });

    if (exists) {
        console.log('🧠 Projeto "X-Force: VisionOps" já existe.');
        await dataSource.destroy();
        process.exit(0);
    }

    const project = projectRepository.create({
        name: 'X-Force: VisionOps',
        description:
            'Plataforma de performance operacional desenvolvida para escalar resultados com base em processos sólidos, organização estratégica e execução impecável. Projeto criado para provar que excelência vem de visão clara, liderança real e código de verdade.',
        status: 'em andamento',
        goals: {
            agilidade: 95,
            encantamento: 90,
            eficiencia: 98,
            excelencia: 100,
            transparencia: 99,
            ambicao: 100,
        },
        responsible: user,
    });

    await projectRepository.save(project);

    console.log('✅ Projeto "X-Force: VisionOps" criado com sucesso.');
    await dataSource.destroy();
}

seed().catch((err) => {
    console.error('Erro ao rodar seed:', err);
    process.exit(1);
});
