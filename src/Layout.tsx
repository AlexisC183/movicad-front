import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import DialogContext from './DialogContext';
import { Dialog } from './components';
import { constants } from './shared';

const Layout = () => {
  const [
    dialogChildren,
    setDialogChildren
  ] = useState<React.ReactNode | undefined>(undefined);

  return (
    <>
      {
        dialogChildren && (
          <Dialog
            classes={ {
              bottomButton: 'primary-btn',
              childrenDiv: 'dialog-children',
              cornerButton: 'secondary-round-btn',
              dialog: 'dialog'
            } }
            styles={ { cornerButtonIcon: { size: constants.FONT_SIZE } } }
            onDismiss={ () => setDialogChildren(undefined) }
          >
            { dialogChildren }
          </Dialog>
        )
      }
      <div className='no-login-layout' inert={ !!dialogChildren }>
        <div className='flex'>
          <div className='no-login-top-bar-logo-div'>
            <Link className='flex' to='/'>
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
        <DialogContext.Provider value={ setDialogChildren }>
          <Outlet/>
        </DialogContext.Provider>
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
    </>
  );
};

export default Layout;
