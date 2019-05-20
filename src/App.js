import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from './store';
import {Provider} from 'react-redux';

import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import MostrarSuscriptor from './componentes/suscriptores/MostrarSuscriptor';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';
import Suscriptores from './componentes/suscriptores/Suscriptores';
import Navbar from './componentes/Layout/Navbar';

function App() {
  return (
   <Provider store={store}>
      <Router>
      <Navbar/>
       <div className="container">
       <Switch>
          <Route exact path="/suscriptores" component={Suscriptores}/>
          <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor}/>
          <Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor}/>
          <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor} />
        </Switch>
       </div>
    </Router>
   </Provider>
  );
}

export default App;
