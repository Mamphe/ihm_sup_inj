import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js';
import styles from './motivoparada.module.css';

const MotivoParada = () => {
    const [motivo, setMotivo] = useState('');
    const [status, setStatus] = useState();

    useEffect(() => {
        socket.on('eventoAutomatico', (data) => {
           // console.log('Evento recebido:', data); // Adicione este log para depuração
            setStatus(data.valor);
            
        });

        // Cleanup on unmount
        return () => {
            socket.off('eventoAutomatico');
        };
    }, []);
    
    useEffect(() => {
        socket.on('novaParada', (data) => {
             console.log('nova parada recebido:', data); // Adicione este log para depuração
            setMotivo(''); 
        });
        
        // Para evitar vazamentos de memória, limpe o listener ao desmontar o componente
        return () => socket.off('novaParada');
    }, [socket]);
    

    const handleChange = (e) => {
        const motivoParada = e.target.value;
        if (window.confirm(`Você realmente deseja parar a máquina para ${motivoParada}?`)) {
            
            console.log(motivoParada)
            socket.emit('motivo_parada', motivoParada);
            setMotivo(motivoParada);
            
           
            /*const motivoParada = prompt('Por favor, insira o motivo da parada:');
            if (motivoParada) {
                setMotivo(motivoParada);
                // Aqui você pode chamar uma função para lidar com a parada, se necessário
            }*/
        }
    };
    const handleNovaParada = () => { 
        setMotivo('');
        socket.emit('nova_parada', motivo);
         // Reseta o motivo da parada 
     };

   // console.log('Status atual:', status); // Adicione este log para depuração

    if (!status && !motivo) { 
        return (
            <div className={styles.card}>
                <h2 className={styles.title}>Selecionar Motivo de Parada</h2>
                <select onChange={handleChange}>
                    <option value="">Selecione um motivo</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Ferramentaria">Ferramentaria</option>
                    <option value="Produção">Produção</option>
                    <option value="Refeição">Refeição</option>
                    <option value="Setup">Setup</option>
                </select>
            </div>
        );
    } else {
        if (!status && motivo) { 
            return (
                <div className={styles.novaParadaCard}> 
                    <h2 className={styles.novaParadaText}>Parada - {motivo}</h2>
                    <button className={styles.novaParadaButton} onClick={handleNovaParada}>Nova Parada</button>
                </div>
            );
        } 

       else
       {
        return null;
        }

        
    }
};

export default MotivoParada;
