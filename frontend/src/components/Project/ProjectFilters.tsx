import { heroes } from '@/data/heroes';
import styles from './ProjectFilters.module.css';

interface ProjectFiltersProps {
  status: string;
  hero: string;
  onChange: (filters: { status: string; hero: string }) => void;
}

export function ProjectFilters({ status, hero, onChange }: ProjectFiltersProps) {
  return (
    <div className={styles.filters}>
      <select
        value={status}
        onChange={(e) => onChange({ status: e.target.value, hero })}
      >
        <option value="">Todos os status</option>
        <option value="pendente">Pendente</option>
        <option value="em_andamento">Em andamento</option>
        <option value="concluido">Concluído</option>
      </select>

      <select
        value={hero}
        onChange={(e) => onChange({ status, hero: e.target.value })}
      >
        <option value="">Todos os heróis</option>
        {heroes.map((hero) => (
          <option key={hero.id} value={hero.id}>
            {hero.name}
          </option>
        ))}
      </select>
    </div>
  );
}
