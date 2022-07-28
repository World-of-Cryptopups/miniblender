import { Dialog } from '@headlessui/react';
import { PencilIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import BaseModal from '../../../components/Modal';
import { useBlendProvider } from '../provider';
import { TargetProps } from '../targets';

interface EditTargetChanceModalProps {
  data: TargetProps;
}

const EditTargetChanceModal = ({ data }: EditTargetChanceModalProps) => {
  const { dispatchTargets, targets } = useBlendProvider();
  const [chance, setChance] = useState(data.chance);

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const editChance = () => {
    if (isNaN(chance)) return; // TODO: show error message in here

    let totalChances = 0;
    for (const t of targets) {
      // skip the chance of the currently selected target template
      if (t.template === data.template) {
        continue;
      }

      totalChances += t.chance;
    }

    if (chance > 100 || chance < 0) {
      // TODO: show error message in here
      return;
    }

    if (totalChances > 100) {
      // TODO: show error message in here
      return;
    }

    if (totalChances + chance > 100) {
      // TODO: show error message in here
      return;
    }

    dispatchTargets({ type: 'set', template: data.template, chance });
  };

  return (
    <>
      <button
        title="Edit chance"
        className="mx-0.5 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg duration-500"
        type="button"
        onClick={openModal}
      >
        <PencilIcon className="h-7 w-7 p-1" />
      </button>

      <BaseModal className="max-w-lg" isOpen={open} closeModal={closeModal}>
        <Dialog.Title as="h4" className="text-lg font-bold text-gray-600">
          Edit Target Chances
        </Dialog.Title>

        <div className="py-4 px-6 flex items-center justify-center">
          <input
            type="number"
            name="chances"
            id="chances"
            className="py-2 px-3 rounded-lg border text-sm "
            placeholder="Set chances"
            defaultValue={chance}
            onChange={(e) => {
              const v = e.currentTarget.valueAsNumber;

              if (isNaN(v)) return;

              setChance(v);
            }}
          />

          <button
            type="button"
            onClick={editChance}
            className="ml-2 bg-indigo-400 hover:bg-indigo-500 text-white py-2 px-6 rounded-lg text-sm font-medium"
          >
            Set
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default EditTargetChanceModal;
