import { FileDownloadOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { authService } from 'services';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const UserList = () => {
  const [searchParams] = useState();

  const exportExcelMutation = useMutation({ mutationFn: authService.exportExcel });
  const { mutate: importExcel } = useMutation({ mutationFn: authService.importExcel });

  const handleExport = async () => {
    const blob = await exportExcelMutation.mutateAsync(searchParams);
    saveAs(blob, 'thong_ke_su_co.xlsx');
  };

  return (
    <div>
      <div className='flex items-center justify-end gap-3'>
        {/* <Button variant='outlined' color='primary' startIcon={<FileDownloadOutlined />} onClick={() => importExcel()}>
          Nhập Excel
        </Button> */}
        <Button variant='outlined' color='primary' startIcon={<FileDownloadOutlined />} onClick={handleExport}>
          Xuất Excel
        </Button>
      </div>
    </div>
  );
};

export default UserList;
