import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='no-login-layout'>
      <div className='no-login-top-bar'>
        <div className='no-login-top-bar-logo-div'>
          <Link className='logo-link' to='/'>
            <img
              className='logo'
              src='https://lisp-lang.org/assets/img/logo/transparent.png'
              alt='Logo'
            />
          </Link>
        </div>
        <div className='no-login-top-bar-controls'>
          <Link
            className='no-login-top-bar-link'
            to='inicio-sesion'
          >
            Acceder
          </Link>
          <Link
            className='no-login-top-bar-link'
            to='registro'
          >
            Unirse
          </Link>
        </div>
      </div>
      <Outlet/>
      <div className='no-login-bottom-bar'>
        <Link
          className='no-login-bottom-bar-link'
          to='guia'
        >
          Guía de uso
        </Link>
        <Link
          className='no-login-bottom-bar-link'
          to='privacidad'
        >
          Aviso de privacidad
        </Link>
        <Link
          className='no-login-bottom-bar-link'
          to='notificar-problema'
        >
          Notificar problema
        </Link>
      </div>
    </div>
  );
};

export default Layout;
