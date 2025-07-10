'use client';

import { api } from '@/services/api';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    console.log(response.data); // token vem aqui
  }

  return (
    <main>
      <h1>Login</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </main>
  );
}
