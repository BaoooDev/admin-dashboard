import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { authService, queryClient } from 'services';

const PopupReject = ({ id, onClose }: any) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.reviewWorker,
    onSuccess: (data) => {
      enqueueSnackbar({ message: data.message, variant: 'success' });
      queryClient.invalidateQueries({
        queryKey: ['authService.getPendingWorkers'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      mutate({
        id,
        action: 'reject',
        ...values,
      });
    })();
  };

  return (
    <>
      <DialogTitle>Thông báo</DialogTitle>

      <DialogContent>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <Controller
              name='reason_reject'
              defaultValue=''
              rules={{
                required: 'Lý do không được để trống',
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Lý do' error={!!error} helperText={error?.message} />
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

export default PopupReject;
