import { Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { authService, queryClient } from 'services';
import PopupReject from 'views/Home/components/PopupReject';

const Home = () => {
  const { data, isPending } = useQuery({
    queryKey: ['authService.getPendingWorkers'],
    queryFn: () => authService.getPendingWorkers(),
    placeholderData: keepPreviousData,
  });

  const { mutate } = useMutation({
    mutationFn: authService.reviewWorker,
    onSuccess: (data) => {
      enqueueSnackbar({ message: data.message, variant: 'success' });
      queryClient.invalidateQueries({
        queryKey: ['authService.getPendingWorkers'],
      });
    },
  });

  const handleApprove = (id: any) => {
    mutate({ action: 'approve', id });
  };

  const [openReject, setOpenReject] = useState(false);
  const [selectedId, setSelectedId] = useState();

  return (
    <div className='p-6'>
      <TableContainer component={Paper}>
        <Spinner loading={isPending}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Căn Cước</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>{item.full_name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.worker_profile.identity_number}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>

                  <TableCell>
                    <div className='flex items-center gap-4'>
                      <Button
                        variant='contained'
                        onClick={() => {
                          handleApprove(item._id);
                        }}
                      >
                        Phê duyệt
                      </Button>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => {
                          setSelectedId(item._id);
                          setOpenReject(true);
                        }}
                      >
                        Từ chối
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isPending && data?.data?.length === 0} />
            </TableBody>
            <caption>{data?.data?.length ?? 0} Workers</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <Dialog open={openReject}>
        <PopupReject id={selectedId} onClose={() => setOpenReject(false)} />
      </Dialog>
    </div>
  );
};

export default Home;
