import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js'; // Adjust the path according to your project structure
import styles from './injetora.module.css';
import maquinaInjetora from '../../assets/icone_injetoras_preto.jpg'; // Certifique-se de ter a imagem no caminho correto

const MaquinaInjetora = () => {
    const [status, setStatus] = useState();

    useEffect(() => {
        socket.on('eventoAutomatico', (data) => {
            setStatus(data.valor);
          console.log(data.valor);
        });
        
        // Cleanup on unmount
        return () => {
            socket.off('eventoAutomatico');
                       
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={maquinaInjetora} alt="Máquina Injetora" className={styles.image} />
                <h1 className={styles.title}>Máquina 01</h1>
                <div className={`${styles.light} ${status ? styles.green : styles.red}`}>    
                </div>
            </div>
        </div>
    );
};

export default MaquinaInjetora;
