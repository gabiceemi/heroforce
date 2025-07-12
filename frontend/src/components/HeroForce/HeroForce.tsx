'use client';

import { Button } from '../Button/Button';
import styles from './HeroForce.module.css';
import { useRouter } from 'next/navigation';

export function HeroForce() {
  const router = useRouter();

  return (
    <div className={styles.heroForce}>
      <h1>🦸‍♂️ HeroForce</h1>
      <p>
        Bem-vindo à sua plataforma de gestão de projetos heroicos.
        Organize, acompanhe e vença suas batalhas com eficiência, agilidade e muito heroísmo!
      </p>
      <Button onClick={() => router.push('/login')}>
        Comece agora 🚀
      </Button>
    </div>
  );
}
