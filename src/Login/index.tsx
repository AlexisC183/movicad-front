import type { ResJso } from '../types';
import { useState, useContext } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
import { cases } from 'cases-conds';
import { VSeparator } from '../components';
import DialogContext from '../DialogContext';
import { constants, useFetch, value } from '../shared';

const SessionStatus = {
  LOADING: {},
  LOGGED_IN: {},
  LOGGED_OUT: {},
  UNKNOWN: {}
};

const LoginForm = () => {
  const [ formValues, setFormValues ] = useState({
    id: '',
    password: ''
  });

  // const navigate = useNavigate();
  const showDialog = value(useContext(DialogContext));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(constants.REMOTE + '/api/sessions/log-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
    })
      .then(res => res.json() as Promise<ResJso<undefined>>)
      .then(jso => {
        switch (jso.status) {
          case 'ok':
            //navigate('/topic/home');
            // TODO
            showDialog('ok');
            break;
          case 'err':
            showDialog(jso.message);
            break;
        }
      })
      .catch(() => showDialog(constants.NETWORK_ERROR));
  };

  return (
    <form
      className='no-login-form'
      onSubmit={ handleSubmit }
    >
      <div className='centerer'>
        <span className='bold'>Acceder</span>
      </div>
      <VSeparator/>
      <label htmlFor='id'>Introducir identificador:</label>
      <input
        id='id'
        name='id'
        className='text-field'
        type='text'
        maxLength={ 50 }
        required={ true }
        autoFocus={ true }
        onChange={ e => setFormValues(prev => {
          return { ...prev, [e.target.name]: e.target.value };
        }) }
      />
      <VSeparator/>
      <label htmlFor='password'>Introducir contraseña:</label>
      <input
        id='password'
        name='password'
        className='text-field'
        type='password'
        maxLength={ 50 }
        required={ true }
        onChange={ e => setFormValues(prev => {
          return { ...prev, [e.target.name]: e.target.value };
        }) }
      />
      <VSeparator/>
      <div className='centerer'>
        <button
          className='primary-btn'
          disabled={ formValues.id === '' || formValues.password === '' }
        >
          Acceder
        </button>
      </div>
    </form>
  );
};

const Login = () => {
  const [ sessionStatus, setSessionStatus ] = useState(SessionStatus.LOADING);
  const api = constants.REMOTE + '/api/sessions/verify-session';

  useFetch<ResJso<{ exists: boolean }>>(api)
    .then(jso => {
      if (jso.status !== 'ok') {
        return;
      }

      setSessionStatus(
        jso.data.exists
        ?
          SessionStatus.LOGGED_IN
        :
          SessionStatus.LOGGED_OUT
      );
    })
    .catch(() => setSessionStatus(SessionStatus.UNKNOWN));

  return cases(sessionStatus)
    .when(SessionStatus.LOADING, <span>Cargando...</span>)
    // .when(SessionStatus.LOGGED_IN, <Navigate to='/topic/home'/>)
    .when(SessionStatus.LOGGED_IN, <span>logged in</span>) // TODO
    .otherwise(<LoginForm/>);
};

export default Login;
