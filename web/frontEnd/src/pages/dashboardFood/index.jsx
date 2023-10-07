import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Api from '../../api';

export default function DashboardFood() {
  const [foodsDay, setFoodsDay] = useState([]);
  const [name, setName] = useState('');
  const [selectedFood, setSelectedFood] = useState([]);

  const navigate = useNavigate();

  //função para guardar o nome do usuario
  const location = useLocation();
  useEffect(() => {
    const nameFromLocation = location.state && location.state.name;
    if (nameFromLocation) {
      setName(nameFromLocation);
    }
  }, [location.state]);


  //utilizado para avançar telas
  function final() {
    navigate('/end', { state: { name } });
  }


  //consula no banco de dados para exibir os itens 
  const fetchFoodsDay = () => {
    Api.get('/tablefoodday')
      .then(response => {
        setFoodsDay(response.data);
        console.log(foodsDay);
      })
      .catch(error => {
        console.error('Erro ao obter os itens do banco de dados', error);
      });
  };
  //chama a função acima automaticamente
  useEffect(() => {
    fetchFoodsDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //função para enviar e apagar os itens votados 
  const handleButtonClick = async index => {
    const selectedIndex = selectedFood.indexOf(index);
    if (selectedIndex !== -1) {
      const updatedSelectedFood = [...selectedFood];
      updatedSelectedFood.splice(selectedIndex, 1);
      setSelectedFood(updatedSelectedFood);
      try {
        //rota para apagar item escolhido
        await Api.delete(`/deleteitemfooduser?name=${name}&food=${foodsDay[index].food}`);
        console.log('Seleção removida com sucesso do almoço');
      } catch (error) {
        console.error('Erro ao remover a seleção do almoço:', error);
      }
    } else {
      setSelectedFood([...selectedFood, index]);
      try {
        //rota para postar o item escolhido
        await Api.post('/postitemfooduser', {
          name,
          food: foodsDay[index].food
        });
        console.log('Seleção salva com sucesso no almoço');
      } catch (error) {
        console.error('Erro ao salvar a seleção no almoço:', error);
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
        <h1>{name},</h1>
        <h2>vote para o almoço!</h2>
      </div>

      <div className="boxContent">
        {foodsDay.map((food, index) => (
          <div key={food.id} className="user-item">
            <p>{food.food}</p>
            <button
              className={`buttonUser ${selectedFood.indexOf(index) !== -1 ? 'buttonConfirmedGreen' : ''}`}
              onClick={() => handleButtonClick(index)}
            >
              {/* função quando clica non botao ele muda de cor e nome */}
              {selectedFood.indexOf(index) !== -1 ? 'Confirmado' : 'Confirmar'}
            </button>
          </div>
        ))
        }


        <button onClick={final} className="buttonFinal">
          Finalizar
        </button>

      </div>
      
    </div>
  );
}
