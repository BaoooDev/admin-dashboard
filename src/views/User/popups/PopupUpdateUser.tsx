import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { authService, queryClient } from 'services';

type PopupProps = PopupController & {
  id: string;
};

const PopupUpdateUser = ({ id, onClose }: PopupProps) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: authService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userService.fetchUsers'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      updateUser({
        id,
        ...values,
      } as UpdateUserBody);
    })();
  };

  return (
    <>
      <DialogTitle>Cập nhật tài khoản</DialogTitle>

      <DialogContent>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <Controller
              name='password'
              defaultValue=''
              rules={{
                required: 'Mật khẩu không được để trống',
                minLength: {
                  value: 8,
                  message: 'Pass phải có ít nhất 8 ký tự',
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Mật khẩu' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Hủy
        </LoadingButton>
        <LoadingButton variant='contained' color='success' loading={isPending} onClick={handleClickSubmit}>
          Cập nhật
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupUpdateUser;
