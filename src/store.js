import {createStore,combineReducers,compose} from 'redux';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

//configurar firestore

const firebaseConfig  ={
    apiKey: "AIzaSyDDUn-eX2OMgYflbCyyfdNIFfzFqRbMQnw",
    authDomain: "bookstore-8d3bd.firebaseapp.com",
    databaseURL: "https://bookstore-8d3bd.firebaseio.com",
    projectId: "bookstore-8d3bd",
    storageBucket: "bookstore-8d3bd.appspot.com",
    messagingSenderId: "864788541581",
    appId: "1:864788541581:web:291ba2f1463d83a6"
}

//inicializar firebase
firebase.initializeApp(firebaseConfig);
//configuracion de react-redux

const rrConfig ={
    userProfile :'users',
    useFirestoreForProfile: true
}

//crear el enhancer o pontenciador con compose y redux firestore

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase,rrConfig),
    reduxFirestore(firebase)
)(createStore);


//reducers
const rootReducer = combineReducers({
    firebase:firebaseReducer,
    firestore: firestoreReducer
})

//state inicial
const initialState ={};

//create el store
const store = createStoreWithFirebase(rootReducer,initialState,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
