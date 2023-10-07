import './headerMaster.css'
import moment from 'moment'//utilizado para data
import React, { useEffect, useState } from "react";
import logo from '../../../assets/logo.jpg'

import { useNavigate } from 'react-router-dom';

export default function HeaderMaster() {

    const navigate = useNavigate()

    const [dateTime, setDateTime] = useState(moment().format('DD/MM/YYYY HH:mm:ss'));


    //funcção de horario e data utilizando o useEffect para atualizar de minuto em minutos 
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(moment().format('DD/MM/YYYY HH:mm'))
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    //function para retornar tela 
    function back() {
        navigate('/')
    }

    return (
        <div className="boxTitle-master">

            <img src={logo} alt="logo" className='img-master' />

            <p className='dateText'>{dateTime}</p>

            <button onClick={back} className='button-back-header'>SAIR</button>

        </div>
    )

}

