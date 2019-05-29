import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types'

class NuevoSuscriptor extends Component {
    state = { 
        nombre: '',
        apellido:'',
        carrera: '',
        codigo: ''
    }

    //agrega un nuevo suscriptor a firestore
    agregarSuscriptor = (e) =>{
        e.preventDefault();
        //extraer los valores del state
        const nuevoSuscriptor = {...this.state}; 
        //extraer firestore de props
        const {firestore, history} = this.props
        //guradarlo en la base de datos
        firestore.add({collection: 'suscriptores'},nuevoSuscriptor)
        .then(() =>
            history.push('/suscriptores'))
    }

    //extrae los valores de los inputs y los coloca en el state
    leerDatos = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 
        return ( 
            <div className="row ">
                <div className="col-12 mb-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                         Volver al listado
                    </Link>
                </div>
                <div className="col-12 ">
                    <h2>
                        <i className="fas fa-user-plus"></i>
                        Nuevo Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.agregarSuscriptor}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name = "nombre"
                                        placeholder="Nombre del suscriptor"
                                        required
                                        onChange ={this.leerDatos}
                                        value= {this.state.nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name = "apellido"
                                        placeholder="Apellido del suscriptor"
                                        required
                                        onChange ={this.leerDatos}
                                        value= {this.state.apellido}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name = "carrera"
                                        placeholder="nombre de la carrera"
                                        required
                                        onChange ={this.leerDatos}
                                        value= {this.state.carrera}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Codigo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name = "codigo"
                                        placeholder="codigo"
                                        required
                                        onChange ={this.leerDatos}
                                        value= {this.state.codigo}
                                    />
                                </div>
                                <input type="submit" value="Agregar suscriptor" className="btn btn-success"></input>
                            </form>
                        </div>
                    </div>
                   
                </div>
            </div>
         );
    }
}

NuevoSuscriptor.propTypes = {
    //firestore : PropTypes.isRiquired
}
 
export default firestoreConnect()(NuevoSuscriptor);