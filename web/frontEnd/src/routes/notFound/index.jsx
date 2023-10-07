import React from "react";
import './notFoundStyle.css'

export default function NotFound() {
    return (
        <div className="containerNotFound">
            <h1 className="text-notFound">Erro, Pagina não encontrada !</h1>
        </div>
    )
}

//caso noa tenha rota com nome sugerid, vai vir para essa tela