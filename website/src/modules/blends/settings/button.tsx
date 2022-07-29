import { AdjustmentsIcon } from '@heroicons/react/solid';

const BlendSettingsButton = () => {
  return (
    <button
      title="Edit Blend Settings"
      className="p-2 mr-2 rounded-lg bg-gray-200 hover:bg-gray-300 duration-300 text-gray-700"
    >
      <AdjustmentsIcon className="h-6 w-6" />
    </button>
  );
};

export default BlendSettingsButton;
