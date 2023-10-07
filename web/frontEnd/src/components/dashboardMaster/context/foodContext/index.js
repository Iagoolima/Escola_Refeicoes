import React, { createContext, useState } from 'react';

const FoodContext = createContext();

const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);

  const handleAddFood = (food) => {
    setFoods([...foods, food]);
  };

  const handleRemoveFood = (index) => {
    const updatedFoods = [...foods];
    updatedFoods.splice(index, 1);
    setFoods(updatedFoods);
  };

  const handleRemoveAllFoods = () => {
    setFoods([])
  };

  return (
    <FoodContext.Provider value={{ foods, handleAddFood, handleRemoveFood, handleRemoveAllFoods }}>
      {children}
    </FoodContext.Provider>
  );
};

export { FoodContext, FoodProvider }


//utilizado para transnferir dados entre componetes, no caso é do register com select