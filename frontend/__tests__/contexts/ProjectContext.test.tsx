import { ProjectProvider, useProjects } from '@/contexts/ProjectContext';
import { render, screen, waitFor } from '@testing-library/react';

import { api } from '@/services/api';
import userEvent from '@testing-library/user-event';

jest.mock('@/services/api');

const mockProjects = [
    {
        id: 1,
        name: 'Projeto 1',
        description: 'Descrição 1',
        status: 'pendente',
        goals: {
            agilidade: 5,
            encantamento: 5,
            eficiencia: 5,
            excelencia: 5,
            transparencia: 5,
            ambicao: 5,
        },
        responsible: {
            id: 1,
            name: 'Fulano',
            character: 'heroi',
            avatarUrl: '',
        },
    },
];

function TestProjectListComponent() {
    const { projects } = useProjects();

    return (
        <ul>
            {projects.map((p) => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    );
}

describe('ProjectContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('carrega os projetos ao montar (fetchProjects)', async () => {
        (api.get as jest.Mock).mockResolvedValueOnce({ data: mockProjects });

        render(
            <ProjectProvider>
                <TestProjectListComponent />
            </ProjectProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Projeto 1')).toBeInTheDocument();
        });

        expect(api.get).toHaveBeenCalledWith('/projects');
    });

    it('adiciona um novo projeto (addProject)', async () => {
        const newProjectDTO: import('@/contexts/ProjectContext').NewProjectDTO = {
            name: 'Novo Projeto',
            description: 'Descrição do novo projeto',
            status: 'em andamento',
            goals: {
                agilidade: 3,
                encantamento: 4,
                eficiencia: 5,
                excelencia: 2,
                transparencia: 3,
                ambicao: 4,
            },
            responsibleId: 2,
        };

        const returnedProject = {
            ...newProjectDTO,
            id: 2,
            responsible: {
                id: newProjectDTO.responsibleId,
                name: 'Ciclano',
                character: 'guerreiro',
                avatarUrl: '',
            },
        };

        (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });
        (api.post as jest.Mock).mockResolvedValueOnce({ data: returnedProject });

        function TestAddProjectComponent() {
            const { addProject, projects } = useProjects();

            return (
                <>
                    <button
                        onClick={() =>
                            addProject({
                                name: newProjectDTO.name,
                                description: newProjectDTO.description,
                                status: newProjectDTO.status,
                                goals: newProjectDTO.goals,
                                responsibleId: newProjectDTO.responsibleId,
                            })
                        }
                    >
                        Adicionar
                    </button>
                    <ul>
                        {projects.map((p) => (
                            <li key={p.id}>{p.name}</li>
                        ))}
                    </ul>
                </>
            );
        }

        render(
            <ProjectProvider>
                <TestAddProjectComponent />
            </ProjectProvider>
        );

        userEvent.click(screen.getByText('Adicionar'));

        await waitFor(() => {
            expect(screen.getByText('Novo Projeto')).toBeInTheDocument();
        });

        expect(api.post).toHaveBeenCalledWith('/projects', {
            name: newProjectDTO.name,
            description: newProjectDTO.description,
            status: newProjectDTO.status,
            goals: newProjectDTO.goals,
            responsibleId: newProjectDTO.responsibleId,
        });
    });
});
