import { FileDownloadOutlined } from '@mui/icons-material';
import {
  Button,
  Grid2,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { saveAs } from 'file-saver';
import { useSearch } from 'hooks';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDebounce } from 'react-use';
import { profileSelector } from 'reducers/profileSlice';
import { authService } from 'services';

const Home = () => {
  const [searchParams, setSearchParams] = useState({});
  const { role } = useSelector(profileSelector);
  const inputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [dataSearch, onSearchChange] = useSearch();

  const { data, isPending, refetch } = useQuery({
    queryKey: ['authService.getTrips', { ...dataSearch, ...searchParams }],
    queryFn: () => authService.fetchTrips({ ...dataSearch, ...searchParams }),
    placeholderData: keepPreviousData,
  });
  const { results = [], page, totalPages, totalResults } = data ?? {};

  const { mutateAsync: exportExcelMutation } = useMutation({ mutationFn: authService.exportExcel });
  const { mutateAsync: importExcel, isPending: isPendingImport } = useMutation({ mutationFn: authService.importExcel });

  const handleExport = async () => {
    const blob = await exportExcelMutation(searchParams);
    saveAs(blob, 'thong_ke_su_co.xlsx');
  };

  const handleChangeFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    const formData = new FormData();
    formData.append('file', fileList[0]);
    const result = await importExcel(formData);
    if (result) {
      refetch();
      enqueueSnackbar('Nhập dữ liệu thành công', { variant: 'success' });
    }
  };

  const { control, setValue, watch } = useForm<ExportBody>({
    defaultValues: {
      from: undefined,
      to: undefined,
      search: undefined,
    },
  });

  const formValues = watch();

  useDebounce(
    () => {
      const searchParams: ExportBody = { ...formValues };
      setSearchParams({
        from: DateTime.fromISO(searchParams.from!).toISODate(),
        to: DateTime.fromISO(searchParams.to!).toISODate(),
        search: searchParams.search === '' ? undefined : searchParams.search,
      });
    },
    500,
    [JSON.stringify(formValues)],
  );

  return (
    <div className='p-6'>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Controller
            name='search'
            control={control}
            render={({ field }) => <TextField {...field} fullWidth label='Tìm kiếm' />}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Controller
            control={control}
            name='from'
            render={({ field }) => (
              <DatePicker
                format='dd/MM/yyyy'
                label='Từ ngày'
                {...field}
                closeOnSelect
                slotProps={{
                  field: { clearable: true, onClear: () => setValue('from', undefined) },
                  textField: { fullWidth: true },
                }}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Controller
            control={control}
            name='to'
            render={({ field }) => (
              <DatePicker
                format='dd/MM/yyyy'
                label='Đến ngày'
                {...field}
                minDate={watch('from') || null}
                closeOnSelect
                slotProps={{
                  field: { clearable: true, onClear: () => setValue('to', undefined) },
                  textField: { fullWidth: true },
                }}
              />
            )}
          />
        </Grid2>
      </Grid2>
      <div className='mt-2 flex items-center justify-end gap-3'>
        {role === 'admin' && (
          <div>
            <input ref={inputRef} type='file' hidden onChange={handleChangeFiles} />
            <Button
              variant='outlined'
              color='primary'
              startIcon={<FileDownloadOutlined />}
              onClick={() => inputRef.current?.click()}
            >
              Nhập Excel
            </Button>
          </div>
        )}

        <Button variant='outlined' color='primary' startIcon={<FileDownloadOutlined />} onClick={handleExport}>
          Xuất Excel
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Spinner loading={isPending || isPendingImport}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian</TableCell>
                <TableCell>Địa điểm</TableCell>
                <TableCell>Vị trí</TableCell>
                <TableCell>Cần kiểm tra lại</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{DateTime.fromISO(item.timeOccurence).toFormat('dd/MM/yyyy HH:mm:ss')}</TableCell>
                  <TableCell>{item.pathOne}</TableCell>
                  <TableCell>{item.pathSecond}</TableCell>
                  <TableCell>{item.isChecked ? 'Có' : 'Không'}</TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isPending && totalResults === 0} />
            </TableBody>
            <caption>{totalResults ?? 0} Sự cố</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <div className='flex justify-center'>
        <Pagination page={page ?? 1} count={totalPages} onChange={(event, value) => onSearchChange({ page: value })} />
      </div>
    </div>
  );
};

export default Home;
