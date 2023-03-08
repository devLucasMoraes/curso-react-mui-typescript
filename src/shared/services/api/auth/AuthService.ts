import { Api } from '../axios-config';

interface IAuth {
    acessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
    try {
        const { data } = await Api.get('/auth', { data: { email, password } });

        if (data) {
            return data;
        }

        return new Error('Erro ao efetuar login.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao efetuar login.');
    }
};
export const AuthService = {auth};