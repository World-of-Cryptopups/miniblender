type IngredientProps = TemplateIngredient | SchemaIngredient | AttributeIngredient;

interface TemplateIngredient {
  type: 'template';
  schema: string;
  template: number;
}

interface SchemaIngredient {
  type: 'schema';
  schema: string;
}

interface AttributeIngredient {
  type: 'attribute';
  schema: string;
  attribute: {
    key: string;
    value: string;
  };
}

type IngredientsReducerActionProps =
  | {
      type: 'add';
      data: IngredientProps;
    }
  | {
      type: 'remove';
      index: number;
    };

const IngredientsReducer = (state: IngredientProps[], action: IngredientsReducerActionProps) => {
  switch (action.type) {
    case 'add': {
      return [...state, action.data];
    }
    case 'remove': {
      return state.filter((_, index) => index !== action.index);
    }
  }
};

export { IngredientsReducer };
export type {
  IngredientProps,
  TemplateIngredient,
  SchemaIngredient,
  AttributeIngredient,
  IngredientsReducerActionProps
};
