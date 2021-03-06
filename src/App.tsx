import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import BoardDetailPage from './pages/BoardDetailPage/BoardDetailPage';
import Page404 from './pages/Page404/Page404';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import { useAppDispatch } from './redux/hooks';
import { validateTokenExpiration } from './redux/user/actions';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(validateTokenExpiration());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="main" element={<MainPage />} />
          <Route path="board/:id" element={<BoardDetailPage />} />
          <Route path="profile-edit" element={<ProfileEditPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
