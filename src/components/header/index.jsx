// src/components/Header.jsx
import React from 'react';
import styles from './header.module.css';
import injetoraIcon from '../../assets/icone_injetoras_preto.jpg'; // Ajuste o caminho conforme necessário
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de atualizar tela

const Header = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <header className={styles.header}>
            <img src={injetoraIcon} alt="Ícone Injetora" className={styles.icon} />
            <h1 className={styles.title}>Supervisório Injetora</h1>
            <FontAwesomeIcon icon={faSync} className={styles.configIcon} onClick={handleRefresh} />
        </header>
    );
};

export default Header;
