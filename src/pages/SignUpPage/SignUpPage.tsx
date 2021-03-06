import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { useAppSelector } from '../../redux/hooks';

const SignUpPage = () => {
  const { t } = useTranslation();
  const userIsAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated);
  return !userIsAuthenticated ? (
    <div className="grid md:h-m l:h-l md:grid-cols-2 gap-6 md:gap-0">
      <div className="flex flex-col content-center justify-center">
        <div className="w-full max-w-input ml-auto mr-auto">
          <div className="mb-6">
            <h2 className="section__title text-primaryBlue">{t('_LBL_SIGN_UP_')}</h2>
          </div>
          <SignUpForm labelColor="primaryBlue" />
          <span className="block text-left text-large">
            {t('_LBL_REGISTERED_')}&nbsp;
            <NavLink to="/signin" className="text-primaryBlue font-semibold">
              {t('_LINK_SING_IN_')}
            </NavLink>
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-primaryBlue to-light-green flex flex-col justify-center items-center gap-10 p-6">
        <div className="bg-white px-14 py-10 rounded">
          <Logo isScrolling={false} isBoardPage={false} />
        </div>
        <div className="text-center section__title text-white">
          <p>{t('_LBL_GET_ALL_DONE_')}</p>
          <p>{t('_LBL_EASILY_')}</p>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/main" replace />
  );
};

export default SignUpPage;
