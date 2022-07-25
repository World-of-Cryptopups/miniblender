import { ICollection } from '@cryptopuppie/useatomicassets';
import { createContext, ReactNode, useContext } from 'react';

interface CreatorBlendProviderProps {
  collection?: ICollection;
  children: ReactNode;
}

interface CreatorBlendContextProps {
  collection?: ICollection;
}

const CreatorBlendContext = createContext<CreatorBlendContextProps>({});

const CreatorBlendProvider = ({ collection, children }: CreatorBlendProviderProps) => {
  return (
    <CreatorBlendContext.Provider value={{ collection }}>{children}</CreatorBlendContext.Provider>
  );
};

const useCreatorBlend = () => {
  const context = useContext(CreatorBlendContext);
  if (context === undefined) {
    throw new Error('<CreatorBlendProvider></CreatorBlendProvider>');
  }

  return context;
};

export { useCreatorBlend };
export default CreatorBlendProvider;
