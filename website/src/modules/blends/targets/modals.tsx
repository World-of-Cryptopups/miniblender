import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import BaseModal from '../../../components/Modal';
import SelectTargetTemplate from './select-template';

const TargetsModal = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center flex-col justify-center h-72 w-56 mx-auto border rounded-lg p-6 bg-gray-100 hover:bg-gray-200 duration-300 text-gray-600 text-sm"
      >
        <PlusIcon className="h-6 w-6 mb-1" />
        add target
      </button>

      <BaseModal className="max-w-xl" isOpen={open} closeModal={closeModal}>
        <Dialog.Title as="h4" className="text-lg font-bold text-gray-600">
          Add Target
        </Dialog.Title>

        <div className="py-6 px-6">
          <SelectTargetTemplate />
        </div>
      </BaseModal>
    </>
  );
};

export default TargetsModal;
