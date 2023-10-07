import React from "react";
import './boxTopStyle.css'
import logo from '../../../assets/logo.jpg'

export default function BoxTop (){
    return(

        <div className="boxTop">

            <img src={logo} alt="logo" className="img-login"/>

        </div>
        
    );
}