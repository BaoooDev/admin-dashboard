import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputNumber } from 'components';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { authService, queryClient } from 'services';

const PopupUpdate = ({ item, onClose }: any) => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      base_price: item.base_price ?? 0,
      price_per_hour: item.price_per_hour ?? 0,
      front_load: item.front_load ?? 0,
      top_load: item.top_load ?? 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.updateService,
    onSuccess: (data) => {
      enqueueSnackbar({ message: data.message, variant: 'success' });
      queryClient.invalidateQueries({
        queryKey: ['authService.getServices'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      mutate({
        id: item._id,
        ...values,
      });
    })();
  };

  return (
    <>
      <DialogTitle>Cập nhật</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='base_price'
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label='Giá cơ bản'
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  slotProps={{
                    input: {
                      inputComponent: InputNumber,
                    },
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='price_per_hour'
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label='Giá theo giờ'
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  slotProps={{
                    input: {
                      inputComponent: InputNumber,
                    },
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='front_load'
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label='Giá máy giặt cửa trước'
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  slotProps={{
                    input: {
                      inputComponent: InputNumber,
                    },
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='top_load'
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label='Giá máy giặt cửa trên'
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  slotProps={{
                    input: {
                      inputComponent: InputNumber,
                    },
                  }}
                />
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
          Xác nhận
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupUpdate;
