import { LoadingButton } from '@mui/lab';
import { Container, Paper, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputPassword } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signIn } from 'reducers/profileSlice';
import { authService } from 'services';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ user, tokens }: LoginResponse) => {
      dispatch(signIn({ ...user, accessToken: tokens.access.token }));
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClickSubmit();
    }
  };

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      if (values.email === 'admindev' && values.password === '123123') {
        login({ email: 'admindev', password: '123123' } as LoginBody);
      } else {
        login(values as LoginBody);
      }
    })();
  };

  return (
    <Container maxWidth='sm'>
      <Paper className='flex flex-col gap-10 p-8'>
        <Controller
          name='email'
          defaultValue=''
          control={control}
          rules={{
            required: 'Email không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              variant='standard'
              label='Email'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='password'
          defaultValue=''
          control={control}
          rules={{
            required: 'Mật khẩu không được để trống',
          }}
          render={({ field, fieldState: { error } }) => (
            <InputPassword
              {...field}
              fullWidth
              variant='standard'
              label='Mật khẩu'
              onKeyDown={handleKeyDown}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <LoadingButton fullWidth variant='contained' loading={isPending} onClick={handleClickSubmit}>
          Đăng nhập
        </LoadingButton>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
