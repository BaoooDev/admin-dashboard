import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from 'env';
import { enqueueSnackbar } from 'notistack';
import { signOut } from 'reducers/profileSlice';
import { store } from 'reducers/store';

const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const { isLoggedIn, token } = store.getState().profile;
  if (isLoggedIn) {
    Object.assign(config.headers as any, {
      Authorization: `Bearer ${token}`,
    });
  }

  try {
    if (config.data instanceof FormData) {
      Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }
  } catch {}
  return config;
};

const onError = async (error: AxiosError) => {
  const { response } = error;
  if (response) {
    const { status, data } = response;
    if (status === 401) {
      store.dispatch(signOut({}));
    }

    const message = (data as any).msg ?? 'Đã có lỗi xảy ra';
    enqueueSnackbar({ message, variant: 'error' });
  }
  return Promise.reject(error);
};

const client = axios.create({ baseURL: API_URL });
client.interceptors.request.use(beforeRequest);
client.interceptors.response.use((response) => response.data, onError);

export { client };
