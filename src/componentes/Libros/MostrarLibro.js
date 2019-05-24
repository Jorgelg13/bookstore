import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';


class MostrarLibro extends Component {
    state = {  }
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