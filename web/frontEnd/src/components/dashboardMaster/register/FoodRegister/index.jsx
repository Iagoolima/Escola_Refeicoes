import { FiPlus } from 'react-icons/fi';
import React, { useContext, useState } from 'react';
import { FoodContext } from "../../context/foodContext"

export default function BoxFoodRegister() {

    const { handleAddFood } = useContext(FoodContext);
    const [food, setFood] = useState('');

    //funcao para quardar o nome que digitou
    const handleInputChange = (event) => {
        setFood(event.target.value)
    };

    //funcao de enviar os valores ao componete select de baixo 
    const handleSubmit = (event) => {
        event.preventDefault();
        if (food.trim() !== '') {
            handleAddFood(food);
            setFood('');
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

            <h2 className='title-register'> Digite as opções de prato para o almoço:</h2>

            <div className="boxInput-register">
                <input
                    type="text"
                    placeholder="Almoço"
                    className="input-register"
                    value={food}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button type="submit" className='button-register' onClick={handleSubmit}><FiPlus style={{ fontSize: '1.3rem' }} /></button>

            </div>

        </div>
    );
}

//esse componete são as box de cima quando voce digita o nome do alimento e ele envia as informações para o componente select para as pessoas confirmar 