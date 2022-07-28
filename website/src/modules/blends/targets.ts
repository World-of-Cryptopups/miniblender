interface TargetProps {
  schema: string;
  template: number;
  chance: number;
}

type TargetsReducerActionProps =
  | {
      type: 'add';
      data: TargetProps;
    }
  | {
      type: 'remove';
      template: number;
    }
  | {
      type: 'set';
      template: number;
      chance: number;
    };

const TargetsReducer = (state: TargetProps[], action: TargetsReducerActionProps) => {
  switch (action.type) {
    case 'add': {
      return [...state, action.data];
    }
    case 'remove': {
      return state.filter((i) => i.template !== action.template);
    }
    case 'set': {
      return state.map((s) => {
        if (s.template === action.template) {
          s.chance = action.chance;
        }

        return s;
      });
    }
  }
};

export { TargetsReducer };
export type { TargetsReducerActionProps, TargetProps };
