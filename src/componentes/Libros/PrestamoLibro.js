import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

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
        consulta.then(resultado => {
            if(resultado.empty){
               this.setState({
                noResultados :true,
                resultado:{}
               })

            } else{
                const datos = resultado.docs[0];
                console.log(datos.data());
                this.setState({
                    resultado: datos.data(),
                    noResultados: false,
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

    //almacena los datos del alumno para solicitar el libro
    solicitarPrestamo =() =>{
        const suscriptor = this.state.resultado;
        //fecha de alta
        suscriptor.fecha_solicitud = new Date().toLocaleDateString();
        //obtener el libro
        const libroActualizado = this.props.libro;
        //agregar el suscriptor del libro
        libroActualizado.prestados.push(suscriptor);
        //obtener firestore y history de props
        const {firestore,history,libro} = this.props
        //almacenar en firestore
        firestore.update({
            collection: 'libros',
            doc : libro.id
        }, libroActualizado)
        .then(history.push('/'))
    }

    render() {
        //extraer el libro
        const {libro} = this.props;

        if(!libro) return <Spinner/>

        //extraer los daots del alumno
        const {noResultados, resultado} = this.state;
        let fichaAlumno, btnSolicitar;

        if(resultado.nombre){
            fichaAlumno = <FichaSuscriptor
                            alumno ={resultado}
                            />
            btnSolicitar = <button type="button" 
                            className="btn btn-success" 
                            onClick={this.solicitarPrestamo}
                            >Solicitar Prestamo</button>
        } else{
            fichaAlumno = null;
            btnSolicitar = null;
        }
        
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
                        <form onSubmit ={this.buscarAlumno} className="mb-4">
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
                        {/*Muestra la ficha del alumno y el boton para solicitar el prestamo*/}
                        {fichaAlumno}
                        <br/>
                        {btnSolicitar}
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