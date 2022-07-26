import { useGetTemplateID } from '@cryptopuppie/useatomicassets';
import PreviewNFT from '../../../components/PreviewNFT';
import { useCreatorBlend } from '../../../contexts/blend-provider';
import { AttributeIngredient, SchemaIngredient, TemplateIngredient } from '../ingredients';
import { useBlendProvider } from '../provider';
import IngredientsModal from './modals';

const IngredientsContainer = () => {
  const { ingredients } = useBlendProvider();

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {ingredients.map((i, index) => (
        <div className="h-72 w-56 mx-auto flex items-center justify-center" key={index}>
          {i.type === 'template' ? (
            <TemplateIngredientContainer data={i} />
          ) : i.type === 'schema' ? (
            <SchemaIngredientContainer data={i} />
          ) : i.type === 'attribute' ? (
            <AttributeIngredientContainer data={i} />
          ) : (
            <></>
          )}
        </div>
      ))}

      <IngredientsModal />
    </div>
  );
};

interface TemplateIngredientProps {
  data: TemplateIngredient;
}
const TemplateIngredientContainer = ({ data }: TemplateIngredientProps) => {
  const { collection } = useCreatorBlend();

  const { data: template } = useGetTemplateID(
    collection
      ? { collectionName: collection?.collection_name, templateID: data.template }
      : undefined
  );

  return (
    <div className="relative">
      <PreviewNFT data={template?.immutable_data} style="h-72 w-56 shadow-xl rounded-lg border" />

      <div className="absolute bottom-0 righgt-0 py-1 px-2 rounded-lg bg-gray-600">
        <span className="text-xs text-gray-100">#{template?.template_id}</span>
      </div>
    </div>
  );
};

interface SchemaIngredientProps {
  data: SchemaIngredient;
}
const SchemaIngredientContainer = ({ data }: SchemaIngredientProps) => {
  return (
    <div className="h-72 w-auto border rounded-lg flex items-center justify-center text-center shadow-xl bg-gray-100">
      <p className="p-6 text-gray-700 text-sm">
        Any NFT in <strong className="underline">{data.schema}</strong> schema
      </p>
    </div>
  );
};
interface AttributeIngredientProps {
  data: AttributeIngredient;
}
const AttributeIngredientContainer = ({ data }: AttributeIngredientProps) => {
  return (
    <div className="h-72 w-auto border rounded-lg flex items-center justify-center text-center shadow-xl bg-gray-100">
      <p className="p-6 text-gray-700 text-sm">
        A NFT in <strong className="underline">{data.schema}</strong> schema with attribute{' '}
        <span className="underline">{data.attribute.key}</span> and value &quot;
        {data.attribute.value}&quot;
      </p>
    </div>
  );
};

export default IngredientsContainer;
