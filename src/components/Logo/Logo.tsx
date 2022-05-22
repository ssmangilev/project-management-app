import logo from '../../assets/images/logo.svg';

type LogoProps = {
  isScrolling: boolean;
  isBoardPage: boolean;
};

const Logo = ({ isScrolling, isBoardPage }: LogoProps): JSX.Element => {
  return (
    <div className="logo">
      <img src={logo} alt="Application logo" id="app_logo" />
      {!(isScrolling || isBoardPage) && <span className="logo__text transition-all">ALLDONE</span>}
    </div>
  );
};

export default Logo;
