import React, { useEffect, useState } from 'react';
import Api from '../../../../api';


export default function FoodResults() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(fetchResults, 2000); // Atualiza a tabela a cada 2 segundos

    return () => {
      clearInterval(intervalId); // Limpa o temporizador ao desmontar o componente
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //consulta no banco de dados para pegar votos
  const fetchResults = async () => {
    try {
      const response = await Api.get('/resultstablefooduser');
      const data = response.data;
      setResults(data);
    } catch (error) {
      console.error('Erro ao obter os resultados do café da manhã:', error);
    }
  };

  return (
    <div className="boxResults">

      <h2 className="titleName-results">Almoço</h2>

      <div className="boxContent-results">
        {/* linha baaixo faz verificação, caso nao tenha nehum item listado aparece a mensagem 'não ha votos' */}
        {results.length === 0 ? (
          <p className='EmptyText'>Não há votos</p>
        ) : (results.map((food, index) => (
          <div key={index} className='boxResults-item'>
            <p className='resultsItem'>Opção: {food.food}</p>
            <p className='resultsItem'>Quantidade: {food.total}</p>

          </div>
        )
        ))}

      </div>

    </div>
  );
}


//esse componente é a box que informa os resultado dos votos da tablea do almoço