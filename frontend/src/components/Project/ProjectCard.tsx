import { Project, useProjects } from '@/contexts/ProjectContext';

import { Avatar } from '../Avatar/Avatar';
import { Pencil } from 'lucide-react';
import { Tag } from '../Tag/Tag';
import styles from './ProjectCard.module.css';
import { useAuth } from '@/contexts/AuthContext';

export function ProjectCard(project: Project) {
  const { name, description, status, goals, responsible } = project;
  const { user } = useAuth();
  const { setProjectToEdit, openModal } = useProjects();

  const isOwner = user?.id === responsible.id;

  function handleEdit() {
    setProjectToEdit(project);
    openModal();
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <Tag status={status} />
        {isOwner && (
          <button className={styles.editButton} onClick={handleEdit}>
            <Pencil size={18} />
          </button>
        )}
      </div>

      <p className={styles.goal}>🎯 {description}</p>

      <div className={styles.goals}>
        {Object.entries(goals).map(([key, value]) => (
          <div key={key} className={styles.goalItem}>
            <span className={styles.goalLabel}>{key.toUpperCase()}</span>
            <span className={styles.goalValue}>{value}</span>
          </div>
        ))}
      </div>

      <div className={styles.owner}>
        <Avatar src={responsible.avatarUrl} alt={responsible.name} />
        <span>{responsible.name}</span>
      </div>
    </div>
  );
}
