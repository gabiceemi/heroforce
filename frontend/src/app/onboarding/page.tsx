'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { HeroCard } from '@/components/HeroCard/HeroCard';
import { api } from '@/services/api';
import { heroes } from '@/data/heroes';
import styles from './onboarding.module.css';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
    } else if (user.character) {
      router.push('/dashboard');
    }
  }, [user, isAuthenticated]);

  async function handleConfirm() {
    if (!selected || !user) return;

    try {
      await api.patch(`/users/${user.id}`, { character: selected });
      await refreshUser();
      toast.success('Personagem escolhido com sucesso!');
      router.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao salvar personagem');
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Escolha seu herói</h1>
      <div className={styles.grid}>
        {heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            name={hero.name}
            image={hero.image}
            selected={selected === hero.id}
            onClick={() => setSelected(hero.id)}
          />
        ))}
      </div>
      <Button onClick={handleConfirm} disabled={!selected}>
        Confirmar
      </Button>
    </div>
  );
}
