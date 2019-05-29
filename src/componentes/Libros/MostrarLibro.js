import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';


class MostrarLibro extends Component {
    devolverLibro = id =>{
        //extraer firestore
        const {firestore} = this.props;

        //copia del libro
        const libroActualizado = {...this.props.libro};
        //eliminar la persona que realiza la devolucion de prestados
        const prestados = libroActualizado.prestados.filter(elemento => elemento.codigo !== id);
        libroActualizado.prestados = prestados;
        //actualizar en firebase
        firestore.update({
            collection: 'libros',
            doc : libroActualizado.id
        }, libroActualizado)
    

    }
    render() { 
        //extraer el libro
        const{libro} = this.props;

        if(!libro) return <Spinner/>;

        //boton para solicitar Libro
        let btnPrestamo;
        
        if(libro.existencia -libro.prestados.length > 0){
            btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`} 
            className="btn btn-success my-3">Solicitar Prestamo</Link>
        }
        else{
            btnPrestamo = null;
        }
        return ( 
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{''}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i>{''}
                        Editar Libro
                    </Link>
                </div>
                <hr className="mx-5 w-100"></hr>
                <div className="mb-4">
                    <h1>{libro.titulo}</h1>
                    <p>
                        <span className="font-weight-bold">ISBN: </span>
                        {libro.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">Editorial: </span>
                        {libro.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">Existencias: </span>
                        {libro.existencia}
                    </p>
                    <p>
                        <span className="font-weight-bold">Prestados: </span>
                        {libro.existencia - libro.prestados.length}
                    </p>
                    {btnPrestamo}
                    {/* muestra las personas que tienen los libros*/}
                    <h3 className="my-2">Personas que tienen el libro Prestado</h3>
                    {libro.prestados.map(prestado => (
                        <div key={prestado.codigo} className="card my-2">
                            <h4 className="card-header">{prestado.nombre} {prestado.apellido}</h4>
                            <div className="card-body">
                              <p>
                                 <span className="font-weight-bold">Codigo: </span>
                                  {prestado.codigo}
                              </p>
                              <p>
                                 <span className="font-weight-bold">Carrera: </span>
                                  {prestado.carrera}
                              </p>
                              <p>
                                 <span className="font-weight-bold">Fecha Solicitud: </span>
                                  {prestado.fecha_solicitud}
                              </p>
                            </div>
                            <div className="card-footer">
                                <button type="button" 
                                className="btn btn-primary font-weight-bold" 
                                onClick={() => this.devolverLibro(prestado.codigo)}>Realizar devolucion</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         );
    }
}

MostrarLibro.propTypes ={
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props =>[
        {
            collection: 'libros',
            storeAs : 'libro',
            doc: props.match.params.id
        }
    ]),connect(({ firestore: {ordered}}, props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
) (MostrarLibro);