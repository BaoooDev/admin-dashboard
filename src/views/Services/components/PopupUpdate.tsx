import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { InputNumber } from 'components';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { authService, queryClient } from 'services';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const PopupUpdate = ({ item, onClose }: any) => {
  const schema = Yup.object().shape({
    base_price: Yup.number().required('Giá cơ bản là bắt buộc').min(0),
    price_per_hour: Yup.number().required('Giá theo giờ là bắt buộc').min(0),
    front_load: Yup.number().required('Giá máy giặt cửa trước là bắt buộc').min(0),
    top_load: Yup.number().required('Giá máy giặt cửa trên là bắt buộc').min(0),
  });

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      base_price: item.base_price ?? 0,
      price_per_hour: item.price_per_hour ?? 0,
      front_load: item.front_load ?? 0,
      top_load: item.top_load ?? 0,
    },
  });

  const { mutate, status } = useMutation({
    mutationFn: authService.updateService,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: 'success' });
      queryClient.invalidateQueries({
        queryKey: ['authService.getServices'],
      });
            onClose();
    },
    onError: (error: any) => {
      const errorMessage =
        (error.response?.data?.message as string) || 'Có lỗi xảy ra khi cập nhật dịch vụ.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    
  });

  const isPending = status === 'pending';

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
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
                  InputProps={{
                    inputComponent: InputNumber,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  InputProps={{
                    inputComponent: InputNumber,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  InputProps={{
                    inputComponent: InputNumber,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  InputProps={{
                    inputComponent: InputNumber,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Hủy
        </LoadingButton>
        <LoadingButton
          variant='contained'
          color='success'
          loading={isPending}
          onClick={handleClickSubmit}
        >
          Xác nhận
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupUpdate;
