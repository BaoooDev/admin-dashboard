import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { authService } from 'services';
import { useSnackbar } from 'notistack';

const Worker = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['authService.getAllWorkers'],
    queryFn: () => authService.getAllWorkers(),
    placeholderData: keepPreviousData,
  });

  const blockWorker = useMutation({
    mutationFn: ({ workerId, action }: { workerId: string; action: string }) =>
      authService.blockWorkerAccount(workerId, action),
    onSuccess: () => {
      enqueueSnackbar('Thao tác thành công!', { variant: 'success' });
      refetch(); 
    },
    onError: (error: any) => {
      enqueueSnackbar(
        error?.response?.data?.message || error?.message || 'Có lỗi xảy ra!',
        { variant: 'error' }
      );
    },
  });
  const isMutating = blockWorker.status === 'pending';

  return (
    <div className="p-6">
      <TableContainer component={Paper}>
        <Spinner loading={isFetching || isMutating}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số lượng công việc đã nhận</TableCell>
                <TableCell>Đánh giá trung bình</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((worker: any) => (
                <TableRow key={worker.workerId}>
                  <TableCell>{worker.fullName}</TableCell>
                  <TableCell>{worker.email}</TableCell>
                  <TableCell>{worker.jobCount}</TableCell>
                  <TableCell>{worker.averageRating ?? 'N/A'}</TableCell>
                  <TableCell>{worker.phoneNumber || 'N/A'}</TableCell>
                  <TableCell>{worker.address || 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={worker.isVerified === 'blocked' ? 'primary' : 'error'}
                      disabled={isMutating} // Disable button while mutation is in progress
                      onClick={() =>
                        blockWorker.mutate({
                          workerId: worker.workerId,
                          action: worker.isVerified === 'blocked' ? 'unblock' : 'block',
                        })
                      }
                    >
                      {worker.isVerified === 'blocked' ? 'Mở khóa' : 'Khóa tài khoản'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isFetching && data?.data?.length === 0} />
            </TableBody>
            <caption>{data?.data?.length ?? 0} Nhân viên</caption>
          </Table>
        </Spinner>
      </TableContainer>
    </div>
  );
};

export default Worker;
