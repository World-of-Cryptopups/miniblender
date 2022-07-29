import { PlusCircleIcon } from '@heroicons/react/solid';
import { useBlendProvider } from './provider';
import { TargetProps } from './targets';

const CreateBlendButton = () => {
  const { targets, ingredients } = useBlendProvider();

  const createBlend = () => {
    if (ingredients.length === 0) {
      // TODO: show error message
      return;
    }

    if (targets.length === 0) {
      // TODO: show error message
      return;
    }

    let finalTargets: TargetProps[] = [];
    if (targets.length === 1) {
      finalTargets = targets;
      finalTargets[0].chance = 100;
    }

    console.log(targets);
    console.log(ingredients);
  };

  return (
    <button
      type="button"
      onClick={createBlend}
      className="py-3 px-6 rounded-lg text-white bg-indigo-400 hover:bg-indigo-500 text-xs font-medium duration-300 inline-flex items-center justify-center"
    >
      <PlusCircleIcon className="h-5 w-5 mr-1" />
      Create Blend
    </button>
  );
};

export default CreateBlendButton;
