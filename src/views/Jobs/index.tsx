import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { keepPreviousData,useMutation, useQuery } from '@tanstack/react-query';
import { Spinner, TableRowEmpty } from 'components';
import { authService, queryClient  } from 'services';
import { formatCurrency, formatDate } from 'utils/common';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

const Jobs = () => {
  const [page, setPage] = useState(1); // Current page
  const [selectedService, setSelectedService] = useState(''); // Selected service filter
  const limit = 10; // Items per page


  const { mutate } = useMutation({
    mutationFn: authService.cancelJob,
    onSuccess: (data) => {
      enqueueSnackbar({ message: data.message, variant: 'success' });
      queryClient.invalidateQueries({
        queryKey: ['authService.getAllJobs'],
      });
    },
  });

  const handleCancel = (id: any) => {
    mutate({ action: 'canceled', id });
  };
  const [selectedId, setSelectedId] = useState();

  // Fetch services for the filter
  const { data: services, isLoading: loadingServices, isError: servicesError } = useQuery({
    queryKey: ['getServices'],
    queryFn: () => authService.getServices(),
  });

  // Fetch paginated jobs with service filter
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllJobs', page, selectedService], // Include selectedService in query key
    queryFn: () => authService.getAllJobs({ page, limit, service: selectedService }), // Pass page, limit, and service
    placeholderData: keepPreviousData,
  });

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1)); // Prevent going below page 1
  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService(event.target.value); // Update selected service
    setPage(1); // Reset to first page when changing filter
  };

  if (isError) {
    return <div className="text-red-500">Error loading jobs: {error.message}</div>;
  }

  if (servicesError) {
    return <div className="text-red-500">Error loading services: Please try again later.</div>;
  }

  return (
    <div className="p-6">
      {/* Service Filter */}
      <div className="flex items-center gap-4 mb-4">
        <TextField
          select
          label="Dịch vụ"
          value={selectedService}
          onChange={handleServiceChange}
          fullWidth
          variant="outlined"
          disabled={loadingServices}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {loadingServices ? (
            <MenuItem disabled>Loading services...</MenuItem>
          ) : services?.results?.length > 0 ? (
            services.results.map((service: any) => (
              <MenuItem key={service._id} value={service._id}>
                {service.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No services available</MenuItem>
          )}
        </TextField>
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedService('');
            setPage(1);
          }}
        >
          Reset Filters
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Spinner loading={isLoading}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Nhân viên</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Dịch vụ</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thanh toán</TableCell>
                <TableCell>Ngày làm việc</TableCell>
                <TableCell>Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.length > 0 ? (
                data.data.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.worker?.full_name || 'N/A'}</TableCell>
                    <TableCell>{item.client?.full_name || 'N/A'}</TableCell>
                    <TableCell>{item.service?.name || 'N/A'}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.payment_status}</TableCell>
                    <TableCell>{formatDate(item.scheduled_time)}</TableCell>
                    <TableCell>
                      {['pending', 'accepted'].includes(item.status) && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleCancel(item._id);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No jobs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <caption>
              Page {page} of {data?.totalPages ?? 1} - Showing {data?.data?.length ?? 0} Jobs from Total {data?.total ?? 0}
            </caption>
          </Table>
        </Spinner>
      </TableContainer>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          Trang trước
        </Button>
        <Button
          variant="outlined"
          disabled={page === (data?.totalPages ?? 1)}
          onClick={handleNextPage}
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
};

export default Jobs;
