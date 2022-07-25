import IngredientsContainer from './ingredients/container';

const NewBlendFormContainer = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="">
        <h4 className="font-bold text-gray-700">Ingredients</h4>

        <IngredientsContainer />
      </div>
    </div>
  );
};

export default NewBlendFormContainer;
