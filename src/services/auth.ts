import { client } from './axios';

const login = (body: LoginBody): Promise<LoginResponse> => client.post(`/auth/login`, body);

const authService = {
  login,
};

export default authService;
