import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Button,
} from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { authService } from 'services';

const Worker = () => {
  // Fetch worker data
  const { data, isPending } = useQuery({
    queryKey: ['authService.getAllWorkers'], // Updated query key to match the new data
    queryFn: () => authService.getAllWorkers(), // Fetch all worker info
    placeholderData: keepPreviousData,
  });

  return (
    <div className="p-6">
      <TableContainer component={Paper}>
        <Spinner loading={isPending}>
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
                          color="error"
                        >
                          Xóa tài khoản
                        </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isPending && data?.data?.length === 0} />
            </TableBody>
            <caption>{data?.data?.length ?? 0} Nhân viên</caption>
          </Table>
        </Spinner>
      </TableContainer>
    </div>
  );
};

export default Worker;
