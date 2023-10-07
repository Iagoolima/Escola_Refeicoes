import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import React, { useContext, useState } from 'react';
import { FoodContext } from '../../context/foodContext';
import Modal from 'react-modal';

import Api from '../../../../api'

export default function SelectFood() {
    const { foods, handleRemoveFood, handleRemoveAllFoods } = useContext(FoodContext);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    //função para deletar o item 
    const handleDeleteFood = (index) => {
        handleRemoveFood(index)
    }

    //rota para enviar os itens escolhidos para a tabela do dia
    const handleConfirm = () => {
        Api.post('/tablefood', { foods })
            .then((response) => {
                console.log('dados enviado com sucesso do almoço', response.data);
                handleRemoveAllFoods();// Remova os itens da lista após confirmar e enviar os dados
            })
            .catch((error) => {
                console.error("erro ao enviar os dados", error)
            })

        setShowConfirmation(false)
    }

    return (
        <div className="select-master">

            <div className="boxSelect">

                <h2 className='title-select'> Almoço</h2>
                {/* verificação para quando nao houber nada box ele informar uma mensagem */}
                <div className="boxSelect-select">
                    {foods.length === 0 ? (
                        <p className='EmptyText'>Preencha</p>
                    ) : (
                        foods.map((food, index) => (
                            <div key={index} className='BoxItem'>

                                <p className='NameItem'>{food}</p>
                                <button className='deleteButton' onClick={() => handleDeleteFood(index)}>
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))

                    )}
                </div>

                <button type="submit" className="buttonConfirm-select" onClick={() => {
                    if (foods.length === 0) {
                        setShowAlert(true);
                    } else {
                        setShowConfirmation(true);
                    }
                }}>
                    Confirmar <FiCheckCircle size={20} />
                </button>


                {/* mensagens para confirmação */}
                <Modal isOpen={showAlert} onRequestClose={() => setShowAlert(false)} className="custom-modal alert">
                    <div className="boxModalAlert ">
                        <h1>Atenção</h1>
                        <p>Digite um alimento primeiro.</p>
                        <button onClick={() => setShowAlert(false)} className='buttonCancel-modal'>Fechar</button>
                    </div>
                </Modal>

                <Modal isOpen={showConfirmation} onRequestClose={() => setShowConfirmation(false)} className="custom-modal confirm">
                    <div className="boxModalAlert">
                        <h1>Confirmar ação</h1>
                        <p>Essa tabela será enviada para os alunos.</p>
                        <button onClick={handleConfirm} className='buttonConfirm-modal'>Confirmar</button>
                        <button onClick={() => setShowConfirmation(false)} className='buttonCancel-modal'>Cancelar</button>
                    </div>
                </Modal>

            </div>
            
        </div>
    );
}


//componente utilizado para setar os itens a ser enviado a tabela do dia