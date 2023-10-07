import "./masterStyle.css"
import React, { useState } from "react";
import { MdColorLens, MdInfo } from 'react-icons/md';
import HeaderMaster from "../../components/dashboardMaster/header"


import BoxCoffeRegister from "../../components/dashboardMaster/register/CoffeeRegister"
import BoxFoodRegister from "../../components/dashboardMaster/register/FoodRegister"

import TableCoffe from "../../components/dashboardMaster/table/tableCoffe"
import TableFood from "../../components/dashboardMaster/table/tableFood"

import SelectCoffe from "../../components/dashboardMaster/select/selectCoffe"
import SelectFood from "../../components/dashboardMaster/select/selectFood"

import CoffeResults from "../../components/dashboardMaster/results/coffeResults";
import FoodResults from "../../components/dashboardMaster/results/foodResults";


import { CoffeProvider } from "../../components/dashboardMaster/context/coffeContext" //utilzado para fazer conexoes do coffe context
import { FoodProvider } from "../../components/dashboardMaster/context/foodContext"//utilzado para fazer conexoes do coffe context

import Modal from 'react-modal';

export default function Master() {
    //mensagens do modal
    const [showModalWelcome, setShowModalWelcome] = useState(false);
    const [showModalHelp, setShowModalHelp] = useState(false);
    const [showModalResults, setShowModalResults] = useState(false);

    const openModalWelcome = () => {
        setShowModalWelcome(true);
    };
    const openModalResults = () => {
        setShowModalResults(true);
    };
    const openModalHelp = () => {
        setShowModalHelp(true);
    };

    return (
        <CoffeProvider>
            
            <FoodProvider>

                <div id="container-master">

                    <HeaderMaster />

                    <div className="titleDashboard">

                        <p>DASHBOARD</p> <span onClick={openModalWelcome}>
                            <MdInfo size={18} style={{ color: 'silver', cursor: 'pointer', margin: '10px' }} title="Ajuda" />
                        </span>

                    </div>

                    <div className="containerMain-master">

                        <div className="containerLeft-master">
                            <div className="containerRegister-master">
                                <BoxCoffeRegister />
                                <BoxFoodRegister />
                            </div>

                            <div className="containerselect-master">

                                <SelectCoffe />

                                <SelectFood />

                            </div>

                        </div>


                        <div className="containerRight-master">

                            <div className="containerTable-master">

                                <h1 className="titletable">
                                    <span onClick={openModalHelp}>
                                        <MdInfo size={15} style={{ color: 'silver', cursor: 'pointer', margin: '2px' }} title="Ajuda" />
                                    </span>Tabela do dia: </h1>
                                <TableCoffe />
                                <TableFood />
                            </div>
                        </div>

                        <div className="containerBottom-master">
                            <h1 className="titletable">
                                <span onClick={openModalResults}>
                                    <MdInfo size={15} style={{ color: 'silver', cursor: 'pointer', margin: '2px' }} title="Ajuda" />
                                </span>Resultado do dia:</h1>

                            <div className="containerResults-master">
                                <CoffeResults />
                                <FoodResults />
                            </div>

                        </div>
                    </div>




                    <Modal isOpen={showModalWelcome} onRequestClose={() => setShowModalWelcome(false)} className="custom-modal help">

                        <div className="boxModalAlert">
                            <h1>Informação</h1>

                            <p>
                                Olá! Bem-vindo ao dashboard, onde você fará as escolhas para o café da manhã e almoço que serão exibidas para os alunos votarem.
                                Aqui você poderá ver a quantidade total de cada opção de café da manhã e almoço votada pelos alunos.
                            </p>

                            <ol>
                                <li>
                                    <strong>Escolha os nomes das opções:</strong>
                                    <ul>
                                        <li>Digite o nome de cada opção e observe que elas aparecerão no campo abaixo.</li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>Verifique suas escolhas:</strong>
                                    <ul>
                                        <li>Revise as opções para garantir que estejam de acordo com o desejado.</li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>Confirme sua seleção:</strong>
                                    <ul>
                                        <li>Clique no botão "Confirmar" para enviar as opções escolhidas para a área de votação dos alunos.</li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>Alimentos em exibição:</strong>
                                    <ul>
                                        <li>Ao lado direito, você poderá ver os alimentos que estão sendo exibidos para os alunos.
                                            Caso necessário, você pode clicar em "Excluir tabela" para cancelar a tabela e recomeçar o processo.
                                        </li>
                                    </ul>
                                </li>
                            </ol>

                            <div class="alert-box">
                                <p>
                                    <strong>Observação:</strong> Ao excluir a tabela, os alunos não terão mais acesso a votação. Certifique-se de excluir a tabela somente quando necessário ou ao finalizar o processo.
                                </p>
                            </div>

                            <button onClick={() => setShowModalWelcome(false)} className='buttonCancel-modal'>Cancelar</button>

                        </div>
                    </Modal>




                    <Modal isOpen={showModalResults} onRequestClose={() => setShowModalResults(false)} className="custom-modal help">

                        <div className="boxModalAlert">
                            <h1>Informação</h1>
                            <p> A tabela a seguir apresenta a quantidade de opções votadas pelos alunos. Quando a tabela é excluída, a contagem dos votos é reiniciada conforme as novas opções passadas. </p>

                            <button onClick={() => setShowModalResults(false)} className='buttonCancel-modal'>Cancelar</button>
                        </div>

                    </Modal>

                    <Modal isOpen={showModalHelp} onRequestClose={() => setShowModalHelp(false)} className="custom-modal help">

                        <div className="boxModalAlert">
                            <h1>Informação</h1>
                            <p>A seguinte tabela estará disponível para visualização pelos alunos. É essencial ter cuidado com as informações que serão exibidas.</p>
                            <p>Em caso de erros, é importante excluir a tabela o mais rápido possível e iniciar uma nova. Dessa forma, os alunos poderão votar normalmente.</p>

                            <button onClick={() => setShowModalHelp(false)} className='buttonCancel-modal'>Cancelar</button>

                        </div>

                    </Modal>

                </div>

            </FoodProvider >

        </CoffeProvider >
    )
}