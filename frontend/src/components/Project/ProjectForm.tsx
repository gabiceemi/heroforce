import { NewProjectDTO, ProjectStatus } from '@/contexts/ProjectContext';

import { Button } from '../Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '../Input/Select';
import { Textarea } from '../Input/Textarea';
import styles from './ProjectForm.module.css';
import { useState } from 'react';

interface ProjectFormProps {
  footer?: React.ReactNode;
  onSubmit: (data: Omit<NewProjectDTO, 'responsibleId'>) => void;
}

export function ProjectForm({ footer, onSubmit }: ProjectFormProps) {
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

  function handleGoalChange(key: keyof NewProjectDTO['goals'], value: number) {
    setGoals((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, description, status, goals });
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
