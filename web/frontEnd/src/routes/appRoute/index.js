// // AppRoute.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PrivateRoute } from "../privateRoute" // função que faz a rota privada

import Login from '../../pages/login';
import DashboardCoffe from '../../pages/dashboardCoffe';
import DashboardFood from '../../pages/dashboardFood';
import End from '../../pages/end';

import Master from '../../pages/master';
import NotFound from '../notFound';

import AuthProvider from '../../components/login/authContext'; //importação que faz o contextApi com 


export default function AppRoute() {
  return (
    <AuthProvider>

      <Router>

        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/master" element={<PrivateRoute> <Master /> </PrivateRoute>} />

          <Route path="/cafe" element={<PrivateRoute><DashboardCoffe /></PrivateRoute>} />

          <Route path="/almoco" element={<PrivateRoute><DashboardFood /></PrivateRoute>} />
          
          <Route path="/end" element={<PrivateRoute><End /></PrivateRoute>} />


          <Route path="*" element={<NotFound />} />

        </Routes>

      </Router>

    </AuthProvider>
  );
}