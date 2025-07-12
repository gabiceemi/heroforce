import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { render, screen, waitFor } from '@testing-library/react';

import { api } from '@/services/api';
import userEvent from '@testing-library/user-event';

jest.mock('@/services/api');

describe('AuthContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();

        (api.post as jest.Mock).mockResolvedValue({ data: {} });
        (api.get as jest.Mock).mockResolvedValue({ data: {} });
    });

    it('faz login e define usuário corretamente', async () => {
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: 'fake-token',
                user: {
                    id: 1,
                    name: 'Test User',
                    email: 'test@example.com',
                    character: null,
                },
            },
        });

        function TestLoginComponent() {
            const { login, user, isAuthenticated } = useAuth();

            return (
                <>
                    <button onClick={() => login('test@example.com', 'password')}>Login</button>
                    {isAuthenticated && <span>Logado como: {user?.name}</span>}
                </>
            );
        }

        render(
            <AuthProvider>
                <TestLoginComponent />
            </AuthProvider>
        );

        await userEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Logado como: Test User')).toBeInTheDocument();
        });

        expect(api.post).toHaveBeenCalledWith('/auth/login', {
            email: 'test@example.com',
            password: 'password',
        });

        expect(localStorage.getItem('token')).toBe('fake-token');
    });

    it('realiza o cadastro e armazena token + usuário', async () => {
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: 'new-user-token',
                user: {
                    id: 2,
                    name: 'Novo Usuário',
                    email: 'novo@example.com',
                    character: null,
                },
            },
        });

        function TestRegisterComponent() {
            const { register, user, isAuthenticated } = useAuth();

            return (
                <>
                    <button onClick={() => register('Novo Usuário', 'novo@example.com', '123456')}>
                        Cadastrar
                    </button>
                    {isAuthenticated && <span>{user?.name}</span>}
                </>
            );
        }

        render(
            <AuthProvider>
                <TestRegisterComponent />
            </AuthProvider>
        );

        await userEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(screen.getByText('Novo Usuário')).toBeInTheDocument();
        });

        expect(localStorage.getItem('token')).toBe('new-user-token');
    });

    it('faz logout e limpa token e usuário', async () => {
        localStorage.setItem('token', 'fake-token');

        function TestLogoutComponent() {
            const { logout, user, isAuthenticated } = useAuth();

            return (
                <>
                    <button onClick={logout}>Logout</button>
                    <div data-testid="auth-state">
                        {isAuthenticated ? 'Autenticado' : 'Deslogado'} - {user?.name ?? 'sem usuário'}
                    </div>
                </>
            );
        }

        render(
            <AuthProvider>
                <TestLogoutComponent />
            </AuthProvider>
        );

        await userEvent.click(screen.getByText('Logout'));

        await waitFor(() => {
            expect(screen.getByTestId('auth-state')).toHaveTextContent('Deslogado');
            expect(localStorage.getItem('token')).toBeNull();
        });
    });

    it('refreshUser busca dados do usuário se token existir', async () => {
        localStorage.setItem('token', 'valid-token');

        const mockUser = {
            id: 1,
            name: 'Usuário Token',
            email: 'token@example.com',
            character: null,
        };

        (api.get as jest.Mock).mockResolvedValueOnce({ data: mockUser });

        function TestRefreshComponent() {
            const { user } = useAuth();

            return <div data-testid="username">{user ? user.name : 'Carregando'}</div>;
        }

        render(
            <AuthProvider>
                <TestRefreshComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('username')).toHaveTextContent('Usuário Token');
        });

        expect(api.get).toHaveBeenCalledWith('/auth/me');
    });


});
