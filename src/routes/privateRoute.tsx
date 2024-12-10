import { Home } from 'views/Home';
import Service from 'views/Services';
import Statistic from 'views/Statistic';
import User from 'views/User';
import Jobs from 'views/Jobs'
import {Worker} from 'views/Worker';
const privateRoute = {
  home: {
    path: '/home',
    name: 'Phê duyệt',
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
  worker: {
    path: '/worker',
    name: 'Nhân viên',
    component: <Worker />,
  },
  jobs: {
    path: '/jobs',
    name: 'Công việc',
    component: <Jobs />,
  },
};

export default privateRoute;
