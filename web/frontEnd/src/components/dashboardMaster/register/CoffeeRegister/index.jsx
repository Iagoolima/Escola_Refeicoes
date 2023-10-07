import '../registerStyle.css'

import React, { useContext, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { CoffeContext } from '../../context/coffeContext';

export default function BoxCoffeRegister() {

  const { handleAddCoffe } = useContext(CoffeContext);
  const [coffe, setCoffe] = useState('');

  //funcao para quardar o nome que digitou
  const handleInputChange = (event) => {
    setCoffe(event.target.value);
  };


  //funcao de enviar os valores ao componete select de baixo 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (coffe.trim() !== '') {
      handleAddCoffe(coffe);
      setCoffe('');
    }
  };

  //efeito do enter para confirmar
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className="boxRegister">
      
      <h2 className='title-register'> Digite as opções de alimentos para o café da manhã:</h2>

      <div className="boxInput-register">
        <input
          type="text"
          placeholder="café"
          className="input-register"
          value={coffe}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className='button-register' onClick={handleSubmit}>
          <FiPlus style={{ fontSize: '1.3rem' }} />
        </button>

      </div>
    </div>
  );
}


//esse componete são as box de cima quando voce digita o nome do alimento e ele envia as informações para o componente select para as pessoas confirmar 