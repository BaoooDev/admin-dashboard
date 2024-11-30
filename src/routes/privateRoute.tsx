import { Home } from 'views/Home';
import Service from 'views/Services';
import Statistic from 'views/Statistic';
import User from 'views/User';

const privateRoute = {
  home: {
    path: '/home',
    name: 'Trang chủ',
    component: <Home />,
  },
  service: {
    path: '/service',
    name: 'Dịch vụ',
    component: <Service />,
  },
  statistic: {
    path: '/statistic',
    name: 'Thống kê',
    component: <Statistic />,
  },
  user: {
    path: '/user',
    name: 'Người dùng',
    component: <User />,
  },
};

export default privateRoute;
