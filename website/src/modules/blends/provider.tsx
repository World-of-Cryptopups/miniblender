import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { IngredientProps, IngredientsReducer, IngredientsReducerActionProps } from './ingredients';
import { TargetProps, TargetsReducer, TargetsReducerActionProps } from './targets';

interface BlendContextProps {
  ingredients: IngredientProps[];
  dispatchIngredients: Dispatch<IngredientsReducerActionProps>;
  targets: TargetProps[];
  dispatchTargets: Dispatch<TargetsReducerActionProps>;
}

const BlendContext = createContext<BlendContextProps>({
  ingredients: [],
  dispatchIngredients: () => undefined,
  targets: [],
  dispatchTargets: () => undefined
});

interface BlendProviderProps {
  children: ReactNode;
}

const BlendProvider = ({ children }: BlendProviderProps) => {
  const [ingredients, dispatchIngredients] = useReducer(IngredientsReducer, []);
  const [targets, dispatchTargets] = useReducer(TargetsReducer, []);

  return (
    <BlendContext.Provider value={{ ingredients, dispatchIngredients, targets, dispatchTargets }}>
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
