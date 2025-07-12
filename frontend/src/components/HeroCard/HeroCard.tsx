import styles from './HeroCard.module.css';

type Props = {
  name: string;
  image: string;
  selected?: boolean;
  onClick: () => void;
};

export function HeroCard({ name, image, selected, onClick }: Props) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <img src={image} alt={name} className={styles.image} />
      <p className={styles.name}>{name}</p>
    </div>
  );
}
