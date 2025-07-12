'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import styles from '../../styles/authForm.module.css';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');

    } catch (err) {
      console.log(err);
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <div className={styles.heroForce}>
      <h1>Login HeroForce</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <Button type="submit">Entrar</Button>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => toast('Em breve: recuperação de senha!')}
          >
            Esqueceu a senha?
          </button>

          <p className={styles.registerText}>
            Não tem conta?{' '}
            <a href="/register" className={styles.registerLink}>
              Crie aqui
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
