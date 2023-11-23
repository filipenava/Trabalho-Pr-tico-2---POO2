// Importação modular no Firebase v9 ou superior
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjTMd6L3OHQHAPiN1ZbV6_c3ZTCPpwD04",
    authDomain: "cidades-brasil.firebaseapp.com",
    projectId: "cidades-brasil",
    storageBucket: "cidades-brasil.appspot.com",
    messagingSenderId: "1063382922965",
    appId: "1:1063382922965:web:324c816edcff364c1c945c",
    measurementId: "G-441R06GNL0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };