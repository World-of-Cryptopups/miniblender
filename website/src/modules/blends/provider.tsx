import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { IngredientProps, IngredientsReducer, IngredientsReducerActionProps } from './ingredients';

interface BlendContextProps {
  ingredients: IngredientProps[];
  dispatchIngredients: Dispatch<IngredientsReducerActionProps>;
}

const BlendContext = createContext<BlendContextProps>({
  ingredients: [],
  dispatchIngredients: () => undefined
});

interface BlendProviderProps {
  children: ReactNode;
}

const BlendProvider = ({ children }: BlendProviderProps) => {
  const [ingredients, dispatchIngredients] = useReducer(IngredientsReducer, []);

  return (
    <BlendContext.Provider value={{ ingredients, dispatchIngredients }}>
      {children}
    </BlendContext.Provider>
  );
};

const useBlendProvider = () => {
  const context = useContext(BlendContext);
  if (context === undefined) {
    throw new Error('<BlendProvider></BlendProvider>');
  }

  return context;
};

export { useBlendProvider };

export default BlendProvider;
