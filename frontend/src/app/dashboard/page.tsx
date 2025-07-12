'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { LogOut } from 'lucide-react';
import { ProjectFilters } from '@/components/Project/ProjectFilters';
import { ProjectForm } from '@/components/Project/ProjectForm';
import { ProjectList } from '@/components/Project/ProjectList';
import { redirect } from 'next/navigation';
import styles from './Dashboard.module.css';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { projects, addProject } = useProjects();
  const [filters, setFilters] = useState({ status: '', hero: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/login');
    } else if (user && !user.character) {
      redirect('/onboarding');
    }
  }, [isAuthenticated, user]);

  const filtered = projects.filter((p) => {
    const matchStatus = filters.status ? p.status === filters.status : true;
    const matchHero = filters.hero
      ? p.responsible.character.toLowerCase().includes(filters.hero.toLowerCase())
      : true;
    return matchStatus && matchHero;
  });

  if (!isAuthenticated || (user && !user.character)) return null;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1>Bem-vindo, {user?.name}</h1>
          <p>🌟 Herói: {user?.character}</p>
        </div>

        <Button onClick={logout} variant="secondary">
          <LogOut size={20} />
        </Button>
      </header>
      <section className={styles.filters}>
        <ProjectFilters
          status={filters.status}
          hero={filters.hero}
          onChange={setFilters}
        />

        <Button onClick={() => setIsModalOpen(true)}>➕ Novo Projeto</Button>
      </section>

      <section className={styles.list}>
        <h2>📋 Projetos</h2>
        <ProjectList projects={filtered} />
      </section>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <ProjectForm
              footer={
                <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                  Cancelar
                </Button>
              }
              onSubmit={(form) => {
                addProject({
                  name: form.name,
                  description: form.description,
                  status: form.status,
                  goals: form.goals,
                  responsibleId: user!.id,
                });
                setIsModalOpen(false);
                toast.success('Projeto criado com sucesso!');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
