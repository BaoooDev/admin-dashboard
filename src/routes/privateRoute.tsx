import { Dashboard } from 'views/Dashboard';
import { Home } from 'views/Home';
import { UserList } from 'views/User';

const privateRoute = {
  dashboard: {
    path: '/dashboard',
    name: 'Dashboard',
    component: <Dashboard />,
  },
  home: {
    path: '/home',
    name: 'Trang chủ',
    component: <Home />,
  },
  user: {
    path: '/users',
    name: 'Danh sách người dùng',
    component: <UserList />,
  },
};

export default privateRoute;
