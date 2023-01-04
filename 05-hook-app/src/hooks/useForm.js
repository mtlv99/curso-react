import { useState } from 'react';

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      // Propiedad computada
      [name]: value,
    });
  };

  // "on" en el nombre para seguir el estandar que usa React y eventos del HTML
  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    // se devuelven todos los items del form por spread operator
    // (aunque no sé si esto sea una buena practica?)
    ...formState,
    formState,
    onInputChange,
    onReset: onResetForm,
  };
};
