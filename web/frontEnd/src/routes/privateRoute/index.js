import React, { useContext } from "react";

import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../components/login/authContext";

export function PrivateRoute({ children }) {

    const { auth } = useContext(AuthContext)

    return auth ? children : <Navigate to="/" />
}

//componente faz verificação se o usuario estar conectado, caso nao, ele volta para a tela original