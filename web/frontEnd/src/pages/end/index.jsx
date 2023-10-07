import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { RiLoader4Line } from 'react-icons/ri';
import './style.css'


export default function End() {

    const [name, setName] = useState('');

    const navigate = useNavigate()

    //usado para guardar o nome do usuario
    const pageLocation = useLocation();
    useEffect(() => {
        const nameFromLocation = pageLocation.state && pageLocation.state.name;
        if (nameFromLocation) {
            setName(nameFromLocation);
        }
    }, [pageLocation.state]);

    //use effect, função para chamar função após 5 segundos,serve para retornar a tela
    useEffect(() => {
        const timer = setTimeout(() => {
            skip();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    //funçaõ utilizada acima para voltar ao inicio 
    function skip() {
        navigate('/')
    }

    //função para evitar retornar de tela 
    useEffect(() => {
        disableBackButton(); // Chamando a função para desabilitar o botão de voltar
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const disableBackButton = () => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', () => {
            window.history.pushState(null, document.title, window.location.href);
        });
    };

    return (
        <div className="container-end">

            <div className="boxText-end">
                <h1>
                    Enviado com sucesso !
                </h1>

                <p>
                    Até a proxima, {name}.
                </p>

                <RiLoader4Line className="loading-icon" />

            </div>

        </div>
    )
}