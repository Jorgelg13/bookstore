import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom';
import Spinner from '../Layout/Spinner';

class EditarSuscriptor extends Component {

    //crear los refs

    nombreref = React.createRef();
    apellidoref= React.createRef();
    codigoref = React.createRef();
    carreraref = React.createRef();

    //editar suscriptor en la bd
    editarSuscriptor = (e) =>{
        e.preventDefault();
        //crear el objeto que va a actualizar
        const suscriptorActualizado ={
            nombre :this.nombreref.current.value,
            apellido : this.apellidoref.current.value,
            codigo: this.codigoref.current.value,
            carrera: this.carreraref.current.value
        }
        //extraer firestore y history de props
        const{suscriptor,history,firestore} = this.props;
        //almacenar el firestore
        firestore.update({
            collection : 'suscriptores',
            doc: suscriptor.id
        }, suscriptorActualizado)
        .then(history.push('/suscriptores'));
    }

    render() { 

        const {suscriptor} = this.props;
        if(!suscriptor) return <Spinner/>

        return ( 
            <div className="row ">
            <div className="col-12 mb-4">
                <Link to={'/suscriptores'} className="btn btn-secondary"/>
                <i className="fas fa-arrow-circle-left"></i>
                Volver al listado
            </div>
            <div className="col-12 ">
                <h2>
                    <i className="fas fa-user"></i>
                    Editar Suscriptor
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={this.editarSuscriptor}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name = "nombre"
                                    placeholder="Nombre del suscriptor"
                                    required
                                    ref ={this.nombreref}
                                    defaultValue= {suscriptor.nombre}
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
                                    ref ={this.apellidoref}
                                    defaultValue= {suscriptor.apellido}
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
                                    ref ={this.carreraref}
                                    defaultValue= {suscriptor.carrera}
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
                                    ref ={this.codigoref}
                                    defaultValue= {suscriptor.codigo}
                                />
                            </div>
                            <input type="submit" value="Editar suscriptor" className="btn btn-success"></input>
                        </form>
                    </div>
                </div>
               
            </div>
        </div>
         );
    }
}
 
 
export default compose(
    firestoreConnect(props =>[
        {
            collection: 'suscriptores',
            storeAs : 'suscriptor',
            doc: props.match.params.id
        }
    ]),connect(({ firestore: {ordered}}, props) => ({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
) (EditarSuscriptor);