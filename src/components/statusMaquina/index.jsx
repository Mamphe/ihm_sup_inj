import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js';
import styles from './status.module.css';
import maquinaInjetora from '../../assets/icone_injetoras_preto.jpg'; // Certifique-se de ter a imagem no caminho correto

const MaquinaInjetora = () => {
    const [status, setStatus] = useState();
    const [connectionStatus, setConnectionStatus] = useState('Desconectado');

    useEffect(() => {
        const handleEventoAutomatico = (data) => {
            setStatus(data.valor);
        };

        socket.on('connect', () => {
            setConnectionStatus('Conectado');
        });

        socket.on('disconnect', () => {
            setConnectionStatus('Desconectado');
        });

        socket.on('eventoAutomatico', handleEventoAutomatico);

        // Cleanup on unmount
        return () => {
            socket.off('eventoAutomatico', handleEventoAutomatico);
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={maquinaInjetora} alt="Máquina Injetora" className={styles.image} />
                <h1 className={styles.title}>Máquina 01</h1>
                <div className={`${styles.light} ${status ? styles.green : styles.red}`}></div>
            </div>
            <div className="status-maquina-card">
                <h2>Status da Máquina</h2>
                <div className={`${styles.statusMaquina} 
                 ${status === undefined ? styles.semConexao :
                        status === true ? styles.maquinaOperando : styles.maquinaParada}`}>
                    {status === undefined ? "Sem Conexão" :
                        status ? "Operando" : "Parada"}
                </div>


            </div>
            <div className={styles.connectionStatus}>
                <p>Estado da Conexão: {connectionStatus}</p>
            </div>
        </div>
    );
};

export default MaquinaInjetora;
