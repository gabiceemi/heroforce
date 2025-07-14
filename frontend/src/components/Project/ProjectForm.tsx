'use client';

import {
  NewProjectDTO,
  ProjectStatus,
  useProjects,
} from '@/contexts/ProjectContext';
import { useEffect, useState } from 'react';

import { Button } from '../Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '../Input/Select';
import { Textarea } from '../Input/Textarea';
import styles from './ProjectForm.module.css';
import { useAuth } from '@/contexts/AuthContext';

interface ProjectFormProps {
  footer?: React.ReactNode;
}

export function ProjectForm({ footer }: ProjectFormProps) {
  const { user } = useAuth();
  const {
    projectToEdit,
    addProject,
    updateProject,
    closeModal,
  } = useProjects();

  const isEditing = !!projectToEdit;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('pendente');
  const [goals, setGoals] = useState<NewProjectDTO['goals']>({
    agilidade: 0,
    encantamento: 0,
    eficiencia: 0,
    excelencia: 0,
    transparencia: 0,
    ambicao: 0,
  });

  const statusOptions: ProjectStatus[] = ['pendente', 'em andamento', 'concluido'];

  useEffect(() => {
    if (projectToEdit) {
      setName(projectToEdit.name);
      setDescription(projectToEdit.description);
      setStatus(projectToEdit.status);
      setGoals(projectToEdit.goals);
    } else {
      setName('');
      setDescription('');
      setStatus('pendente');
      setGoals({
        agilidade: 0,
        encantamento: 0,
        eficiencia: 0,
        excelencia: 0,
        transparencia: 0,
        ambicao: 0,
      });
    }
  }, [projectToEdit]);

  function handleGoalChange(key: keyof NewProjectDTO['goals'], value: number) {
    setGoals((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    const formData: NewProjectDTO = {
      name,
      description,
      status,
      goals,
      responsibleId: user.id,
    };

    if (isEditing && projectToEdit) {
      updateProject(projectToEdit.id, formData);
    } else {
      addProject(formData);
    }

    closeModal();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        id="name"
        label="Nome do Projeto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Textarea
        id="description"
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Select
        id="status"
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        options={statusOptions.map((status) => ({
          value: status,
          label: status.charAt(0).toUpperCase() + status.slice(1),
        }))}
      />

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Metas</legend>
        <div className={styles.goalGrid}>
          {Object.entries(goals).map(([key, value]) => (
            <Input
              key={key}
              id={`goal-${key}`}
              label={key[0].toUpperCase() + key.slice(1)}
              type="number"
              value={value}
              min={0}
              max={100}
              onChange={(e) =>
                handleGoalChange(key as keyof typeof goals, Number(e.target.value))
              }
            />
          ))}
        </div>
      </fieldset>

      <div className={styles.actions}>
        <Button type="submit">Salvar</Button>
        {footer}
      </div>
    </form>
  );
}
