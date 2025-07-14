'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { api } from '@/services/api';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'pendente' | 'em andamento' | 'concluido';
  goals: {
    agilidade: number;
    encantamento: number;
    eficiencia: number;
    excelencia: number;
    transparencia: number;
    ambicao: number;
  };
  responsible: {
    id: number;
    character: string;
    name: string;
    avatarUrl?: string;
  };
}

export type NewProjectDTO = {
  name: string;
  description: string;
  status: 'pendente' | 'em andamento' | 'concluido';
  goals: {
    agilidade: number;
    encantamento: number;
    eficiencia: number;
    excelencia: number;
    transparencia: number;
    ambicao: number;
  };
  responsibleId: number;
};

export type ProjectStatus = 'pendente' | 'em andamento' | 'concluido';

interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  addProject: (project: NewProjectDTO) => Promise<void>;
  updateProject: (id: number, project: NewProjectDTO) => Promise<void>;
  projectToEdit: Project | null;
  setProjectToEdit: (project: Project | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ProjectContext = createContext({} as ProjectContextType);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setProjectToEdit(null);
  }

  async function updateProject(id: number, project: NewProjectDTO) {
    const { data } = await api.put(`/projects/${id}`, project);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? data : p))
    );
  }

  async function fetchProjects() {
    const { data } = await api.get('/projects');
    setProjects(data);
  }

  async function addProject(project: NewProjectDTO) {
    const { data } = await api.post('/projects', project);
    setProjects((prev) => [...prev, data]);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        fetchProjects,
        addProject,
        updateProject,
        projectToEdit,
        setProjectToEdit,
        isModalOpen,
        openModal,
        closeModal
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}
