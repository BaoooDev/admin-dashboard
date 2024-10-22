import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { authService } from 'services';

const Dashboard = () => {
  const { data, isPending } = useQuery({
    queryKey: ['authService.queryDashboard'],
    queryFn: () => authService.queryDashboard(),
  });

  console.log();

  return (
    <div className='grid h-[calc(100vh-64px-48px)] grid-cols-12 gap-2 bg-[#313f64] md:grid-cols-3'>
      <div className='rounded-md bg-[#1a4093]'></div>
      <div className='rounded-md bg-[#1a4093]'>
        <Typography variant='h5' className='mt-2 text-center text-white'>
          TOP 10 ( VỊ TRÍ XẢY RA SỰ CỐ )
        </Typography>
        {!isPending && data && (
          <ResponsiveContainer height={400} width='100%'>
            <BarChart
              data={data}
              margin={{
                top: 40,
                right: 0,
                left: 0,
              }}
            >
              <XAxis
                dataKey='pathSecond'
                angle={-45}
                interval={0}
                tick={{ fill: 'white', fontSize: 6, textAnchor: 'end' }}
              />
              <YAxis interval={1} tick={{ fill: 'white' }} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey='count' fill='#f7af10' />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='rounded-md bg-[#1a4093]'></div>
      <div className='rounded-md bg-[#1a4093]'></div>
      <div className='rounded-md bg-[#1a4093]'></div>
      <div className='rounded-md bg-[#1a4093]'></div>
    </div>
  );
};

export default Dashboard;
