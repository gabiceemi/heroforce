import { HeroForce } from "@/components/HeroForce/HeroForce";
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroForce />
      <footer className={styles.footer}>
        © 2025 HeroForce. Todos os direitos reservados.
      </footer>
    </div>
  );
}
