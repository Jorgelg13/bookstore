import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';

class PrestamoLibro extends Component {
    state = { 
        noResultados: false,
        busqueda :'',
        resultado : {}
    }

    //buscar alumno por codigo
    buscarAlumno = e =>{
        e.preventDefault();
        //obtener el valor a buscar
        const {busqueda} = this.state;
        //extraer el firestore
        const {firestore} = this.props;
        //hacer la consulta
        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo", "==",busqueda).get();

        //leer los resultados
        consulta.then(resultado =>{
            if(!resultado.empty){
               this.setState({
                noResultados :false,
                resultado:{}
               })

            } else{
                const datos = resultado.docs[0];
                this.setState({
                    resultado: datos.data(),
                    noResultados: false
                })
            }

        })
    }

    //almacenar el codigo en el state

    leerDato = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        //extraer el libro
        const {libro} = this.props;

        if(!libro) return <Spinner/>
        
        return (  
           <div className="row">
             <div className="col-12 mb-4">
                 <Link to={'/'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>
                    Volver al listado
                 </Link>
             </div>
             <div className="col-12">
                <h2>
                    <i className="fas fa-book"></i>{ ' '}
                    Solicitar Prestamo: {libro.titulo}
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit ={this.buscarAlumno}>
                            <legend className="color-primary text-center">
                                Buscar suscriptor por su codigo
                            </legend>
                            <div className="form-group">
                              <input 
                              type="text" 
                              name="busqueda" 
                              className="form-control" 
                              onChange={this.leerDato} />
                            </div>
                            <input type="submit" value="Buscar Alumno" className="btn btn-success"/>
                        </form>
                    </div>
                </div>
             </div>
           </div>
        );
    }
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection: 'libros',
            storeAs: 'libro',
            doc: props.match.params.id
        }
    ]), connect(({ firestore: { ordered } }, props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(PrestamoLibro);