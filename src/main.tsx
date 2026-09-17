import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// /
import NoLoginLayout from './Layout';
import Home from '.';
import Guide from './Guide';
import Privacy from './Privacy';
import Registration from './Registration';
import Login from './Login';
import NotifyProblem from './NotifyProblem';
import NotFound from './NotFound';

// /app
import AppLayout from './App/Layout';
import App from './App';
import SearchAdministratives from './App/SearchAdministratives';
import Administrative from './App/Administratives/Administrative';
import CallsFor from './App/Administratives/Administrative/CallsFor';
import Compose from './App/Administratives/Administrative/Compose';
import CallFor from './App/CallsFor/CallFor';
import Modify from './App/CallsFor/CallFor/Modify';
import Delete from './App/CallsFor/CallFor/Delete';
import ChangePassword from './App/ChangePassword';
import CustomizeProfile from './App/CustomizeProfile';
import Applications from './App/Applications';
import DirectMessages from './App/DirectMessages';
import SearchCallsFor from './App/SearchCallsFor';
import ReceivedMessages from './App/ReceivedMessages';
import SentMessages from './App/SentMessages';
import Statistics from './App/Statistics';
import CreateCallFor from './App/CreateCallFor';

// /app/foros/:convocatoria
import ForumLayout from './App/Forums/CallFor/Layout';
import Forum from './App/Forums/CallFor';
import PrivateMessages from './App/Forums/CallFor/Students/Student/PrivateMessages';
import Files from './App/Forums/CallFor/Students/Student/Files';
import Applicants from './App/Forums/CallFor/Applicants';
import Banned from './App/Forums/CallFor/Banned';
import ForumFiles from './App/Forums/CallFor/ForumFiles';
import Links from './App/Forums/CallFor/Links';
import FrequentQuestions from './App/Forums/CallFor/FrequentQuestions';

import './index.css';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <NoLoginLayout/> }>
        <Route index element={ <Home/> }/>
        <Route path='guia' element={ <Guide/> }/>
        <Route path='privacidad' element={ <Privacy/> }/>
        <Route path='registro' element={ <Registration/> }/>
        <Route path='inicio-sesion' element={ <Login/> }/>
        <Route path='notificar-problema' element={ <NotifyProblem/> }/>
      </Route>
      <Route path='/app' element={ <AppLayout/> }>
        <Route index element={ <App/> }/>
        <Route path='buscar-administrativos' element={ <SearchAdministratives/> }/>
        <Route path='administrativos/:administrativo' element={ <Administrative/> }/>
        <Route path='administrativos/:administrativo/convocatorias' element={ <CallsFor/> }/>
        <Route path='administrativos/:administrativo/redactar' element={ <Compose/> }/>
        <Route path='convocatorias/:convocatoria' element={ <CallFor/> }/>
        <Route path='convocatorias/:convocatoria/modificar' element={ <Modify/> }/>
        <Route path='convocatorias/:convocatoria/eliminar' element={ <Delete/> }/>
        <Route path='cambiar-contrasena' element={ <ChangePassword/> }/>
        <Route path='personalizar-perfil' element={ <CustomizeProfile/> }/>
        <Route path='postulaciones' element={ <Applications/> }/>
        <Route path='mensajes-directos' element={ <DirectMessages/> }/>
        <Route path='buscar-convocatorias' element={ <SearchCallsFor/> }/>
        <Route path='mensajes-recibidos' element={ <ReceivedMessages/> }/>
        <Route path='mensajes-enviados' element={ <SentMessages/> }/>
        <Route path='estadisticas' element={ <Statistics/> }/>
        <Route path='crear-convocatoria' element={ <CreateCallFor/> }/>
        <Route path='foros/:convocatoria' element={ <ForumLayout/> }>
          <Route index element={ <Forum/> }/>
          <Route path='estudiantes/:estudiante/mensajes-privados' element={ <PrivateMessages/> }/>
          <Route path='estudiantes/:estudiante/archivos' element={ <Files/> }/>
          <Route path='postulados' element={ <Applicants/> }/>
          <Route path='vetados' element={ <Banned/> }/>
          <Route path='archivos-foro' element={ <ForumFiles/> }/>
          <Route path='enlaces' element={ <Links/> }/>
          <Route path='preguntas-frecuentes' element={ <FrequentQuestions/> }/>
        </Route>
      </Route>
      <Route path='*' element={ <NotFound/> }/>
    </Routes>
  </BrowserRouter>
);
