import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from './store';
import {Provider} from 'react-redux';

import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import MostrarSuscriptor from './componentes/suscriptores/MostrarSuscriptor';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';
import Suscriptores from './componentes/suscriptores/Suscriptores';
import Navbar from './componentes/Layout/Navbar';
import Libros from './componentes/Libros/Libros';
import MostrarLibro from './componentes/Libros/MostrarLibro';
import NuevoLibro from './componentes/Libros/NuevoLibro';
import EditarLibro from './componentes/Libros/EditarLibro';
import PrestamoLibro from './componentes/Libros/PrestamoLibro';



function App() {
  return (
   <Provider store={store}>
      <Router>
      <Navbar/>
       <div className="container">
       <Switch>
          <Route exact path="/" component={Libros} />
          <Route exact path="/libros/mostrar/:id" component={MostrarLibro}/>
          <Route exact path="/libros/editar/:id" component={EditarLibro}/>
          <Route exact path="/libros/nuevo/" component={NuevoLibro}/>
          <Route exact path="/libros/prestamo/:id" component={PrestamoLibro}/>

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
