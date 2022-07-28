import IngredientsContainer from './ingredients/container';
import TargetsContainer from './targets/container';

const NewBlendFormContainer = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="">
        <h4 className="font-bold text-gray-700">Ingredients</h4>

        <IngredientsContainer />
      </div>

      <hr className="my-4" />

      <div>
        <h4 className="font-bold text-gray-700">Targets</h4>

        <TargetsContainer />
      </div>
    </div>
  );
};

export default NewBlendFormContainer;
