import { Avatar } from '../Avatar/Avatar';
import { Project } from '@/contexts/ProjectContext';
import { Tag } from '../Tag/Tag';
import styles from './ProjectCard.module.css';

export function ProjectCard(project: Project) {
  const { name, description, status, goals, responsible } = project;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <Tag status={status} />
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
