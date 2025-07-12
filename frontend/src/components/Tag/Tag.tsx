import { ProjectStatus } from "@/contexts/ProjectContext";

interface TagProps {
  status: ProjectStatus;
}

export function Tag({ status }: TagProps) {
  const colors = {
    pendente: 'gray',
    'em andamento': 'orange',
    concluido: 'green',
  };

  const label = {
    pendente: 'Pendente',
    'em andamento': 'Em andamento',
    concluido: 'Concluído',
  };

  return (
    <span
      style={{
        color: '#fff',
        backgroundColor: colors[status],
        padding: '0.25rem 0.5rem',
        borderRadius: '5px',
        fontSize: '0.85rem',
        fontWeight: 'bold',
      }}
    >
      {label[status]}
    </span>
  );
}
