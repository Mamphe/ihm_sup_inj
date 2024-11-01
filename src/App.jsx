// src/App.jsx
import React, { useState } from 'react';
import '@fontsource/poppins'; // Importa a fonte Poppins
import './App.css';
import InjetoraStatus from './components/injetoraStatus';
import StatusMaquina from './components/statusMaquina';
import MotivoParada from './components/motivoParada';
import Header from './components/header'; // Importa o componente Header

const App = () => {
    return (
        <div className="app">
            <Header />
           {/*<h1 className="header-branco">Supervisório IHM</h1>*/}
            {/*<InjetoraStatus />*/}
            <StatusMaquina />
            <MotivoParada />
        </div>
    );
};

export default App;
