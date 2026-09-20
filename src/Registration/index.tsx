import type { ResJso } from '../types';
import { useState, useContext } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
import { cases, conds } from 'cases-conds';
import { QuestionMarkIcon } from '@phosphor-icons/react';
import { HSeparator, VSeparator } from '../components';
import DialogContext from '../DialogContext';
import { constants, useFetch, value } from '../shared';

type BlurValidation = { success: true } | { success: false, message: string };

type BlurValidations = {
  id: BlurValidation,
  password: BlurValidation,
  password1: BlurValidation
};

const SessionStatus = {
  LOADING: {},
  LOGGED_IN: {},
  LOGGED_OUT: {},
  UNKNOWN: {}
};

const validators = {
  id: (s: string): BlurValidation => {
    const success = /^\w+$/.test(s);
    return success
      ?
        { success: true }
      :
        {
          success: false,
          message: 'Introducir un identificador válido'
        };
  },
  password: (s: string): BlurValidation => {
    return conds(s)
      .when<BlurValidation>(s => s.length < 8, {
        success: false,
        message: 'Introducir una contraseña más larga'
      })
      .when(s => /^(\p{L}|\p{N})+$/u.test(s), {
        success: false,
        message: 'Introducir una contraseña con un carácter especial'
      })
      .when(s => s.split('').every(ch => ch === s[0]), {
        success: false,
        message: 'Introducir una contraseña con caracteres diferentes'
      })
      .otherwise({ success: true });
  }
};

const PasswordHelp = () => (
  <div>
    Por favor elegir una contraseña no usada en otros sitios. La contraseña debe tener:
    <ul className='ul'>
      <li>un carácter especial como estos: ! @ # $ %</li>
      <li>dos caracteres diferentes, es decir, contraseñas como !!!!!!!! no están permitidas</li>
    </ul>
  </div>
);

const RegisterForm = () => {
  const [ formValues, setFormValues ] = useState({
    id: '',
    password: '',
    password1: '',
    role: 'estudiante'
  });

  // /!\ This state is for UI only, not for form submission /!\
  const [ blurValidations, setBlurValidations ] = useState<BlurValidations>({
    id: { success: true },
    password: { success: true },
    password1: { success: true }
  }); // Defaulting to non-warning messages

  // const navigate = useNavigate();
  const showDialog = value(useContext(DialogContext));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const idValidation = validators.id(formValues.id);

    if (!idValidation.success) {
      showDialog(idValidation.message);
      return;
    }
    if (formValues.password !== formValues.password1) {
      showDialog('Las contraseñas no coinciden');
      return;
    }

    const passwordValidation = validators.password(formValues.password);

    if (!passwordValidation.success) {
      showDialog(passwordValidation.message);
      return;
    }

    fetch(constants.REMOTE + '/api/users/create', {
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
        <span className='bold'>Unirse</span>
      </div>
      <VSeparator/>
      {
        blurValidations.id.success
        ?
          <label htmlFor='id'>Introducir un identificador único:</label>
        :
          <label className='warning-color' htmlFor='id'>
            { blurValidations.id.message }:
          </label>
      }
      <div className='field-btn-pair'>
        <input
          id='id'
          name='id'
          className='text-field-grown'
          type='text'
          maxLength={ 50 }
          minLength={ 1 }
          required={ true }
          autoFocus={ true }
          onChange={ e => setFormValues(prev => {
            return { ...prev, [e.target.name]: e.target.value };
          }) }
          onBlur={ e => setBlurValidations(prev => {
            return {
              ...prev,
              id: validators.id(e.target.value)
            };
          }) }
        />
        <HSeparator/>
        <button
          className='secondary-round-btn'
          type='button'
          onClick={ () => showDialog(
            'Identificador de usuario para iniciar sesión. Solo letras sin acentos, sin eñes. Se permiten números y guiones bajos.'
          ) }
        >
          <QuestionMarkIcon size={ constants.FONT_SIZE }/>
        </button>
      </div>
      <VSeparator/>
      {
        blurValidations.password.success
        ?
          <label htmlFor='password'>Introducir contraseña:</label>
        :
          <label className='warning-color' htmlFor='password'>
            { blurValidations.password.message }:
          </label>
      }
      <div className='field-btn-pair'>
        <input
          id='password'
          name='password'
          className='text-field-grown'
          type='password'
          minLength={ 8 }
          maxLength={ 50 }
          required={ true }
          onChange={ e => setFormValues(prev => {
            return { ...prev, [e.target.name]: e.target.value };
          }) }
          onBlur={ e => setBlurValidations(prev => {
            return {
              ...prev,
              password: validators.password(e.target.value)
            };
          }) }
        />
        <HSeparator/>
        <button
          className='secondary-round-btn'
          type='button'
          onClick={ () => showDialog(<PasswordHelp/>) }
        >
          <QuestionMarkIcon size={ constants.FONT_SIZE }/>
        </button>
      </div>
      <VSeparator/>
      {
        blurValidations.password1.success
        ?
          <label htmlFor='password1'>Confirmar contraseña:</label>
        :
          <label className='warning-color' htmlFor='password1'>
            { blurValidations.password1.message }:
          </label>
      }
      <input
        id='password1'
        name='password1'
        className='text-field'
        type='password'
        minLength={ 8 }
        maxLength={ 50 }
        required={ true }
        onChange={ e => setFormValues(prev => {
          return { ...prev, [e.target.name]: e.target.value };
        }) }
        onBlur={ e => setBlurValidations(prev => {
          return {
            ...prev,
            password1: validators.password(e.target.value)
          };
        }) }
      />
      <VSeparator/>
      <span>Rol:</span>
      <div className='flex'>
        <input
          id='student'
          name='role'
          className='radio'
          type='radio'
          value='estudiante'
          onClick={ () => setFormValues(prev => {
            return { ...prev, role: 'estudiante' }
          }) }
          checked={ formValues.role === 'estudiante' }
        />
        <label
          className='radio-label'
          htmlFor='student'
        >
          Estudiante
        </label>
        <HSeparator/>
        <input
          id='administrative'
          name='role'
          className='radio'
          type='radio'
          value='administrativo'
          onClick={ () => setFormValues(prev => {
            return { ...prev, role: 'administrativo' }
          }) }
          checked={ formValues.role === 'administrativo' }
        />
        <label
          className='radio-label'
          htmlFor='administrative'
        >
          Administrativo
        </label>
      </div>
      <VSeparator/>
      <div className='centerer'>
        <button className='primary-btn'>Unirse</button>
      </div>
    </form>
  );
};

const Register = () => {
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
    .otherwise(<RegisterForm/>);
};

export default Register;
