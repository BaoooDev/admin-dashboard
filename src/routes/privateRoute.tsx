import { Home } from 'views/Home';
import { UserList } from 'views/User';

const privateRoute = {
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
