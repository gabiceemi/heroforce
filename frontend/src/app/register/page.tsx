'use client';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import styles from '../../styles/authForm.module.css';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await register(name, email, password);
      toast.success('Conta criada com sucesso!');
      router.push('/onboarding');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao criar conta');
    }
  }

  return (
    <div className={styles.heroForce}>
      <h1>Crie sua conta</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="name"
          label="Nome completo"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
        />
        <Input
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" "
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" "
        />
        <Button type="submit">Cadastrar</Button>
        <div className={styles.actions}>
          <p className={styles.registerText}>
            Já tem uma conta?{' '}
            <a href="/login" className={styles.registerLink}>
              Faça login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
