import { client } from './axios';

const login = (body: LoginBody): Promise<LoginResponse> => client.post(`/auth/login`, body);

const importExcel = (): Promise<Blob> => client.post(`/histories/import`);

const exportExcel = (body?: ExportBody): Promise<Blob> =>
  client.post(`/histories/export`, body, { responseType: 'blob' });

const authService = {
  login,
  exportExcel,
  importExcel,
};

export default authService;
