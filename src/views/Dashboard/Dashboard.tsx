import { Chip, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { authService } from 'services';

const Dashboard = () => {
  const { data, isPending } = useQuery({
    queryKey: ['authService.queryDashboard'],
    queryFn: () => authService.queryDashboard(),
  });

  const { data: trips } = useQuery({
    queryKey: ['authService.getTripsInMonth'],
    queryFn: () =>
      authService.getTripsInMonth({
        from: DateTime.now().startOf('month').toISODate(),
        to: DateTime.now().endOf('month').toISODate(),
      }),
    placeholderData: keepPreviousData,
  });

  console.log(trips);

  return (
    <div className='grid h-screen grid-cols-12 gap-2 bg-[#313f64] md:grid-cols-3'>
      <div className='rounded-md bg-[#1a4093]'></div>
      <div className='rounded-md bg-[#1a4093]'>
        <Typography variant='h6' className='mt-2 text-center text-white'>
          TOP 10 ( VỊ TRÍ XẢY RA SỰ CỐ )
        </Typography>
        {!isPending && data && (
          <ResponsiveContainer height={240} width='100%'>
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
              <Bar dataKey='count' fill='#f7af10' barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='rounded-md bg-[#1a4093]'></div>
      <div className='flex flex-col gap-2 rounded-md bg-[#1a4093]'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          tổng số sự cố trong tháng: {trips?.length}
        </Typography>
        <div className='flex-1 overflow-hidden'>
          <div className='animate-vertical-marquee flex flex-col divide-y'>
            {trips?.map((item) => (
              <div className='space-y-2 p-2 text-white'>
                <Chip color='warning' label={item.pathOne} size='small' />
                <div className='whitespace-nowrap'>{item.pathSecond}</div>
                <div className='text-sm'>
                  Thời gian xảy ra: {DateTime.fromISO(item.timeOccurence).toFormat('dd/MM/yyyy HH:mm:ss')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='rounded-md bg-[#1a4093]'></div>
      <div className='rounded-md bg-[#1a4093]'></div>
    </div>
  );
};

export default Dashboard;
