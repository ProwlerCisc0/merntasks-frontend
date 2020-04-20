import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Proyectos from './components/proyectos/Proyectos';
import RutaPrivada from './components/ruta/RutaPrivada';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/validacion/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/tokenAuth';

//Revisar token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component= {Login}></Route>
                <Route exact path="/register" component= {Register}></Route>
                <RutaPrivada exact path="/proyectos" component= {Proyectos}></RutaPrivada>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
