import React from "react";
import './boxBottomStyle.css'
import Authentication from "../autenticaction/";

export default function BoxBottom() {
    return (
        <div className="boxBottom">

            <h1 className="text-boxBottom">Bem vindo(a) !</h1>

            <Authentication />
            
        </div>

    )
}