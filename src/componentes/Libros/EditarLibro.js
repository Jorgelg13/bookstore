import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';

class EditarLibro extends Component {
    state = {}

    //refs
    tituloref = React.createRef();
    editorialref= React.createRef();
    ISBNref = React.createRef();
    existenciaref = React.createRef();

    //actualizar libro en firebase
    actualizarLibro = e =>{
        e.preventDefault();
        //construir objeto
        const libroActualizado = {
            titulo : this.tituloref.current.value,
            editorial : this.editorialref.current.value,
            ISBN : this.ISBNref.current.value,
            existencia : this.existenciaref.current.value
        }
        //leer firestore y history
        const {firestore, history, libro} = this.props;
        //actualizar firebase
        firestore.update({
            collection : 'libros',
            doc: libro.id
        }, libroActualizado)
        .then( () => history.push('/'))
    }

    render() {
        //obtener el libro
        const { libro } = this.props;

       if (!libro) return <Spinner />;

        return (
            <div className="row ">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>
                    Volver al listado
                    </Link>
            </div>
                <div className="col-12 ">
                    <h2>
                        <i className="fas fa-book"></i>
                        Editar Libro
                </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.actualizarLibro} >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="titulo del libros"
                                        defaultValue={libro.titulo}
                                        ref= {this.tituloref}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="editorial"
                                        defaultValue={libro.editorial}
                                        ref= {this.editorialref}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="ISBN"
                                        defaultValue={libro.ISBN}
                                        ref = {this.ISBNref}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        defaultValue="Existencia"
                                        defaultValue={libro.existencia}
                                        ref = {this.existenciaref}
                                    />
                                </div>
                                <input type="submit" value="Actualizar" className="btn btn-success" />
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
)(EditarLibro);