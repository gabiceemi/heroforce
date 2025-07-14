'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { LogOut } from 'lucide-react';
import { ProjectFilters } from '@/components/Project/ProjectFilters';
import { ProjectForm } from '@/components/Project/ProjectForm';
import { ProjectList } from '@/components/Project/ProjectList';
import { redirect } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const {
    projects,
    isModalOpen,
    openModal,
    closeModal,
    setProjectToEdit,
  } = useProjects();

  const [filters, setFilters] = useState({ status: '', hero: '' });

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

  function handleNewProject() {
    setProjectToEdit(null); // limpa o estado anterior de edição
    openModal();
  }

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
        <Button onClick={handleNewProject}>➕ Novo Projeto</Button>
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
                <Button onClick={closeModal} variant="secondary">
                  Cancelar
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
