import React from "react";
import './loginStyle.css'
import BoxTop from "../../components/login/boxTop/index.jsx";
import BoxBottom from "../../components/login/boxBottom";


export default function Login (){
    return(
        <div className="container">

            <BoxTop/>

            <BoxBottom/>

            <p>Desenvolvido por Iago</p>
            
        </div>
    );
}