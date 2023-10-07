import React, { createContext, useState } from 'react';

const CoffeContext = createContext();

const CoffeProvider = ({ children }) => {
  const [coffes, setCoffes] = useState([]);

  const handleAddCoffe = (coffe) => {
    setCoffes([...coffes, coffe]);
  };

  const handleRemoveCoffe = (index) => {
    const updatedCoffes = [...coffes];
    updatedCoffes.splice(index, 1);
    setCoffes(updatedCoffes);
  };

  const handleRemoveAllCoffes = () => {
    setCoffes([]);
  };

  return (
    <CoffeContext.Provider value={{ coffes, handleAddCoffe, handleRemoveCoffe, handleRemoveAllCoffes }}>
      {children}
    </CoffeContext.Provider>
  );
};

export { CoffeContext, CoffeProvider };


//utilizado para transnferir dados entre componetes, no caso é do register com select