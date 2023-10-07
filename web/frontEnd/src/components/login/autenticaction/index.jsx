import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import './authStyle.css'
import { AuthContext } from "../authContext";

import CryptoJS from 'crypto-js';

import api from '../../../api'

export default function Authentication() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();//importação para react hook form, forma mais pratica de validação de usuaario
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);//utilizado para a rota privada

  //função de verificação de usuario no db
  function onSubmit(data) {
    //função para criptografar a senha no formato md5
    const encryptedUser = CryptoJS.MD5(data.user).toString();

    //rota para fazer verificação se tem usuario com a senha passada 
    api.post('/login', { user: encryptedUser })
      .then(response => {
        const { user, name, type } = response.data;

        console.log(`Usuário: ${user}, Nome: ${name}, Tipo: ${type}`);

        //se o usuario for do type 'master' ele va para dashboard master
        if (type === 'master') {
          navigate('master');
          setAuth(true);// função quando conectado ele muda a autenticação para true, definindo a rota privada, somente quando true ele pode acessar o as rotas
        }
        else {
          //se o a tabela de café da manhã e almoço estiver vazia, ele vai exibir um alert informando que nao tem como acessar
          api.get('/tablecoffeday')
            .then(response => {
              const coffesDay = response.data;

              if (coffesDay.length === 0) {
                api.get('/tablefoodday')
                  .then(response => {
                    const foodsDay = response.data;

                    if (foodsDay.length === 0) {
                      alert(`Olá ${name}, não tem opções para votar no momento, volte mais tarde.`);
                    }

                    //caso nao tenha tabela de café, ele vai para a tabela do almoço dretamente
                    else {
                      navigate('almoco', { state: { name } });
                      setAuth(true);
                    }
                  });

                //caso tenha a do café ele vai para a tela do café normalmente
              } else {
                navigate('cafe', { state: { name } });
                setAuth(true);
              }
            })
            .catch(error => {
              console.error('Erro ao obter os itens da tabela de café:', error);
            });
        }
      })
      .catch(error => {
        console.error('Erro ao fazer o login:', error);
        if (error.response && error.response.status === 401) {
          setPasswordError(true);
        }
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="boxInput">

        <input placeholder="Digite seu R.A" maxLength={6} {...register("user", { required: true })} className="input-login" />

        {errors.user && <span> Campo obrigatório.</span>}
        {/* quando o usuario nao for encontrado aparece essa mensagem  */}
        {passwordError && <span>Usuario não encontrado</span>}

      </div>

      <button type="submit" className="buttonLogin" >Entrar</button>

    </form>

  );
}

//componente utilizado para fazer autenticação do usuario