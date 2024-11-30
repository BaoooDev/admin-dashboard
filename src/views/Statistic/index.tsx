import { Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { authService } from 'services';

const Statistic = () => {
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  const { data, isPending } = useQuery({
    queryKey: ['authService.getMonthlyRevenue'],
    queryFn: () => authService.getMonthlyRevenue(),
    placeholderData: keepPreviousData,
  });

  const { data: dataSecond } = useQuery({
    queryKey: ['authService.getTotalRevenue'],
    queryFn: () => authService.getTotalRevenue(),
    placeholderData: keepPreviousData,
  });

  const { data: dataThird } = useQuery({
    queryKey: ['authService.getServiceRevenue'],
    queryFn: () => authService.getServiceRevenue(),
    placeholderData: keepPreviousData,
  });

  const { data: dataFour } = useQuery({
    queryKey: ['authService.getMostBookedService'],
    queryFn: () => authService.getMostBookedService(),
    placeholderData: keepPreviousData,
  });

  const { data: dataFive } = useQuery({
    queryKey: ['authService.getWorkerRankings'],
    queryFn: () => authService.getWorkerRankings(),
    placeholderData: keepPreviousData,
  });

  const renderLabel = (entry: any) => {
    return `${entry.serviceName} - ${entry.count}`;
  };

  const renderSeviceLabel = (entry: any) => {
    return `${entry.name} - ${entry.totalRevenue}`;
  };

  return (
    <div className='grid h-screen grid-cols-2 grid-rows-2 gap-8'>
      <div className='p-2'>
        <Typography variant='h6' className='text-center'>
          Doanh thu tháng / Tổng ( {dataSecond?.data ?? 0} )
        </Typography>
        {!isPending && data?.data && (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data?.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='_id' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='totalRevenue' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
              <Bar dataKey='count' fill='#82ca9d' activeBar={<Rectangle fill='gold' stroke='purple' />} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='p-2'>
        <Typography variant='h6' className='text-center'>
          Doanh thu dịch vụ
        </Typography>
        {!isPending && dataThird?.data && (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie data={dataThird?.data} fill='#8884d8' label={renderSeviceLabel} dataKey='totalRevenue'>
                {dataThird?.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='p-2'>
        <Typography variant='h6' className='text-center'>
          Dịch vụ được đặt nhiều
        </Typography>
        {!isPending && dataFour?.data && (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie data={dataFour?.data} fill='#8884d8' label={renderLabel} dataKey='count'>
                {dataFour?.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='p-2'>
        <Typography variant='h6' className='text-center'>
          Worker Ranking
        </Typography>
        {!isPending && dataFive?.data && (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={dataFive?.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='fullName' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='jobCount' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Statistic;
