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

  return (
    <div className='grid h-screen grid-cols-12 grid-rows-2 gap-2 bg-[#313f64]'>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-2'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          top 10 vị trí sự cố (rec, lbs, rmu) trung thế
        </Typography>
        {!isPending && data && (
          <ResponsiveContainer height='90%' width='100%'>
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
              <YAxis
                domain={[0, 'dataMax']}
                ticks={Array.from({ length: Math.max(...data.map((d) => d.count)) + 1 }, (_, i) => i)}
                tick={{ fill: 'white' }}
              />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey='count' fill='#f7af10' barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-2'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          số sự cố xuất tuyến trung thế trong tháng
        </Typography>
      </div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-2'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          top 10 vị trí sự cố xuất tuyến 110kV
        </Typography>
      </div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-2'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          Số sự cố (rec, lbs, rmu) trung thế trong tháng: {trips?.length}
        </Typography>
        <div className='h-[90%] overflow-hidden'>
          <div className='animate-marquee flex flex-col divide-y'>
            {trips?.map((item, index) => (
              <div key={index} className='space-y-2 p-2 text-white'>
                <Chip color='warning' label={item.pathOne} size='small' />
                <div>
                  {DateTime.fromISO(item.timeOccurence).toFormat('dd/MM/yyyy HH:mm:ss')}: Mất tín hiệu tại vị trí{' '}
                  {item.pathSecond}
                </div>
              </div>
            ))}
          </div>
          <div className='animate-marquee2 flex flex-col divide-y'>
            {trips?.map((item, index) => (
              <div key={index} className='space-y-2 p-2 text-white'>
                <Chip color='warning' label={item.pathOne} size='small' />
                <div>
                  {DateTime.fromISO(item.timeOccurence).toFormat('dd/MM/yyyy HH:mm:ss')} {item.pathSecond}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-2'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          số sự cố xuất tuyến trung thế trong tháng
        </Typography>
      </div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-2'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          số sự cố xuất tuyến 110kV trong tháng
        </Typography>
      </div>
    </div>
  );
};

export default Dashboard;
