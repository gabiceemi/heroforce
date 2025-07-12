import { Project } from '@/contexts/ProjectContext';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectList.module.css';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) return <p>Nenhum projeto encontrado.</p>;

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
