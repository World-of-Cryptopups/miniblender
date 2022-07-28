import { useGetTemplateID } from '@cryptopuppie/useatomicassets';
import { XCircleIcon } from '@heroicons/react/solid';
import PreviewNFT from '../../../components/PreviewNFT';
import { useCreatorBlend } from '../../../contexts/blend-provider';
import { useBlendProvider } from '../provider';
import { TargetProps } from '../targets';
import EditTargetChanceModal from './edit-chance';
import TargetsModal from './modals';

const TargetsContainer = () => {
  const { targets, dispatchTargets } = useBlendProvider();

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {targets.map((t, index) => (
        <div className="h-72 w-56 relative mx-auto flex items-center justify-center" key={index}>
          <div className="absolute z-50 -top-1 -right-1 inline-flex items-center">
            <button
              title="Remove ingredient"
              className="mx-0.5 bg-red-400 hover:bg-red-500 text-white rounded-lg duration-500"
              type="button"
              onClick={() => dispatchTargets({ type: 'remove', template: t.template })}
            >
              <XCircleIcon className="h-7 w-7 p-1" />
            </button>
            {targets.length > 1 ? <EditTargetChanceModal data={t} /> : <></>}
          </div>

          {targets.length > 1 ? (
            <span
              title="Chances that the target will blend"
              className="absolute -top-1 -left-1 z-50 bg-indigo-500 text-white py-1 px-3 text-xs rounded-lg"
            >
              {t.chance}%
            </span>
          ) : (
            <></>
          )}

          <TemplateTargetContainer data={t} />
        </div>
      ))}

      <TargetsModal />
    </div>
  );
};

interface TemplateTargetProps {
  data: TargetProps;
}
const TemplateTargetContainer = ({ data }: TemplateTargetProps) => {
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

export default TargetsContainer;
