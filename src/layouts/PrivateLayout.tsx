import { AppHeader } from 'containers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { authRoute, privateRoute } from 'routes';

const PrivateLayout = () => {
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigator(authRoute.login.url, { replace: true });
    }
  }, [isLoggedIn, navigator]);

  return (
    <main>
      {location.pathname !== privateRoute.dashboard.path && <AppHeader />}
      <Routes>
        {Object.values(privateRoute).map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
        <Route path='*' element={<Navigate to={privateRoute.home.path} />} />
      </Routes>
    </main>
  );
};

export default PrivateLayout;
