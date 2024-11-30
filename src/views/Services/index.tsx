import { Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { useState } from 'react';
import { authService } from 'services';
import { formatCurrency } from 'utils/common';
import PopupUpdate from 'views/Services/components/PopupUpdate';

const Service = () => {
  const { data, isPending } = useQuery({
    queryKey: ['authService.getServices'],
    queryFn: () => authService.getServices(),
    placeholderData: keepPreviousData,
  });

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectItem, setSelectItem] = useState();

  return (
    <div className='p-6'>
      <TableContainer component={Paper}>
        <Spinner loading={isPending}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Giá cơ bản</TableCell>
                <TableCell>Giá theo giờ</TableCell>
                <TableCell>Giá máy giặt cửa trước</TableCell>
                <TableCell>Giá máy giặt cửa trên</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results?.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{formatCurrency(item.base_price)}</TableCell>
                  <TableCell>{formatCurrency(item.price_per_hour)}</TableCell>
                  <TableCell>{formatCurrency(item.front_load)}</TableCell>
                  <TableCell>{formatCurrency(item.top_load)}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setSelectItem(item);
                        setOpenUpdate(true);
                      }}
                    >
                      Cập nhật
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isPending && data?.results?.length === 0} />
            </TableBody>
            <caption>{data?.results?.length ?? 0} Services</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <Dialog open={openUpdate}>
        <PopupUpdate item={selectItem} onClose={() => setOpenUpdate(false)} />
      </Dialog>
    </div>
  );
};

export default Service;
