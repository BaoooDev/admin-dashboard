import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { authService } from 'services';
import { formatCurrency } from 'utils/common';

const User = () => {
  const { data, isPending } = useQuery({
    queryKey: ['authService.getTopClients'],
    queryFn: () => authService.getTopClients(),
    placeholderData: keepPreviousData,
  });

  return (
    <div className='p-6'>
      <TableContainer component={Paper}>
        <Spinner loading={isPending}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Số lượng công việc đã đặt</TableCell>
                <TableCell>Số tiền đã chi trả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{formatCurrency(item.jobCount)}</TableCell>
                  <TableCell>{formatCurrency(item.totalSpent)}</TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isPending && data?.data?.length === 0} />
            </TableBody>
            <caption>{data?.data?.length ?? 0} Khách</caption>
          </Table>
        </Spinner>
      </TableContainer>
    </div>
  );
};

export default User;
