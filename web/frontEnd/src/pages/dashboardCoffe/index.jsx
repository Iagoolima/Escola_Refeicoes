import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './dashboardStyle.css';
import Api from '../../api';

export default function DashboardCoffe() {
  const [coffesDay, setCoffesDay] = useState([]);
  const [name, setName] = useState('');
  const [selectedCoffe, setSelectedCoffe] = useState([]);

  const navigate = useNavigate();

  //função para guardar o nome do usuario
  const pageLocation = useLocation();
  useEffect(() => {
    const nameFromLocation = pageLocation.state && pageLocation.state.name;
    if (nameFromLocation) {
      setName(nameFromLocation);
    }
  }, [pageLocation.state]);

  //função verifica se tem algo no banco de dados da tabela de almoço, caso tenha, ele avança para o almoço normalmente, caso nao, ele pula o almoço e vai para a a tela final
  function skip() {
    Api.get('/tablefoodday')
      .then(response => {
        const foodsDay = response.data;

        if (foodsDay.length === 0) {
          navigate('/end', { state: { name }, replace: true });
        } else {
          navigate('/almoco', { state: { name }, replace: true });
        }
      });
  }

  //consula no banco de dados para exibir os itens 
  const fetchCoffesDay = () => {
    Api.get('/tablecoffeday')
      .then(response => {
        setCoffesDay(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter os itens do banco de dados', error);
      });
  };
  //chama a função acima automaticamente
  useEffect(() => {
    fetchCoffesDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //função para enviar e apagar os itens votados 
  const handleButtonClick = async (index) => {

    const selectedIndex = selectedCoffe.indexOf(index);

    if (selectedIndex !== -1) {
      const updatedSelectedCoffe = [...selectedCoffe];
      updatedSelectedCoffe.splice(selectedIndex, 1);
      setSelectedCoffe(updatedSelectedCoffe);

      try {
        //rota para apagar item escolhido
        await Api.delete(`/deleteitemcoffeuser?name=${name}&coffe=${coffesDay[index].coffe}`);
        console.log('Seleção removida com sucesso do café');
      } catch (error) {
        console.error('Erro ao remover a seleção do café:', error);
      }
    }

    else {
      setSelectedCoffe([...selectedCoffe, index]);
      try {
        //rota para postar o item escolhido
        await Api.post('/postitemcoffeuser', {
          name,
          coffe: coffesDay[index].coffe
        });
        console.log('Seleção salva com sucesso no café');
      } catch (error) {
        console.error('Erro ao salvar a seleção no café:', error);
      }
    }
  };


  //desativa o botao de voltar tela
  useEffect(() => {
    disableBackButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const disableBackButton = () => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, document.title, window.location.href);
    });
  };

  return (
    <div id="container-dashboard">

      <div className="boxText">
        <h1>Olá {name}</h1>
        <h2>Vote para o café do dia!</h2>
      </div>

      <div className="boxContent">
        {coffesDay.map((coffe, index) => (
          <div key={coffe.id} className="user-item">
            <p>{coffe.coffe}</p>
            <button
              className={`buttonUser ${selectedCoffe.indexOf(index) !== -1 ? 'buttonConfirmedGreen' : ''}`}
              onClick={() => handleButtonClick(index)}
            >
              {/* função quando clica non botao ele muda de cor e nome */}
              {selectedCoffe.indexOf(index) !== -1 ? 'Confirmado' : 'Confirmar'}
            </button>
          </div>
        ))}

        <button onClick={skip} className="buttonSkip">
          Seguir
        </button>
      </div>

    </div>
  );
}
