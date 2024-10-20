import { CreateOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { useSearch } from 'hooks';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { authService } from 'services';
import { PopupCreateUser, PopupUpdateUser } from 'views/User/popups';

const Home = () => {
  const { role } = useSelector(profileSelector);
  const [dataSearch, onSearchChange] = useSearch();
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [selectId, setSelectId] = useState<string>();

  const { data, isLoading } = useQuery({
    queryKey: ['authService.fetchUsers', dataSearch],
    queryFn: () => authService.fetchUsers(dataSearch),
    placeholderData: keepPreviousData,
  });
  const { results = [], page, totalPages, totalResults } = data ?? {};
  return (
    <div>
      {role === 'admin' && (
        <div className='flex items-center justify-end gap-3'>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<CreateOutlined />}
            onClick={() => setOpenCreatePopup(true)}
          >
            Tạo người dùng
          </Button>
        </div>
      )}

      <TableContainer component={Paper}>
        <Spinner loading={isLoading}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell align='center'>
                    <div className='flex items-center gap-x-4'>
                      <Button
                        variant='outlined'
                        color='secondary'
                        size='small'
                        onClick={() => {
                          setSelectId(item.id);
                          setOpenUpdatePopup(true);
                        }}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isLoading && totalResults === 0} />
            </TableBody>
            <caption>{totalResults ?? 0} Người dùng</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <div className='flex justify-center'>
        <Pagination page={page ?? 1} count={totalPages} onChange={(event, value) => onSearchChange({ page: value })} />
      </div>

      <Dialog open={openCreatePopup}>
        <PopupCreateUser onClose={() => setOpenCreatePopup(false)} />
      </Dialog>

      <Dialog open={openUpdatePopup}>
        <PopupUpdateUser id={selectId!} onClose={() => setOpenUpdatePopup(false)} />
      </Dialog>
    </div>
  );
};

export default Home;
