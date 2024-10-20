import { FileDownloadOutlined } from '@mui/icons-material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { saveAs } from 'file-saver';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { authService } from 'services';

const Home = () => {
  const [searchParams] = useState({});
  const { role } = useSelector(profileSelector);
  const inputRef = useRef<HTMLInputElement>(null);

  const [dataImport, setDataImport] = useState<TripRecordType[]>([]);

  const { mutateAsync: exportExcelMutation } = useMutation({ mutationFn: authService.exportExcel });
  const { mutateAsync: importExcel, isPending } = useMutation({ mutationFn: authService.importExcel });

  const handleExport = async () => {
    const blob = await exportExcelMutation(searchParams);
    saveAs(blob, 'thong_ke_su_co.xlsx');
  };

  const handleChangeFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    const formData = new FormData();
    formData.append('file', fileList[0]);
    const results = await importExcel(formData);
    if (results.length > 0) setDataImport(results);
  };

  return (
    <div>
      {role === 'admin' && (
        <div className='flex items-center justify-end gap-3'>
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

          <Button variant='outlined' color='primary' startIcon={<FileDownloadOutlined />} onClick={handleExport}>
            Xuất Excel
          </Button>
        </div>
      )}

      <TableContainer component={Paper}>
        <Spinner loading={isPending}>
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
              {dataImport.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.timeOccurence}</TableCell>
                  <TableCell>{item.pathOne}</TableCell>
                  <TableCell>{item.pathSecond}</TableCell>
                  <TableCell>{item.isChecked ? 'Có' : 'Không'}</TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isPending && dataImport.length === 0} />
            </TableBody>
            <caption>{dataImport.length ?? 0} Sự cố</caption>
          </Table>
        </Spinner>
      </TableContainer>
    </div>
  );
};

export default Home;
